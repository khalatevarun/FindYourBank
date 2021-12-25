import { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Input,
  notification,
} from 'antd';
import { allbanksColumn } from '../../constants/table/allbanksColumn';
import { categories, cities } from '../../constants/customOptions';
import map from 'lodash/map';
import get from 'lodash/get';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import './style.scss';
import { getAllBanksData } from '../../utility/api/banksDataAPI';

const { Option } = Select;
const AllBanksScreen = ({
  userData,
  addToFavorites,
  removeFromFavorites,
  banksData,
  setBanksData,
}) => {
  const [citySelected, setCitySelected] = useState('MUMBAI');
  const [loading, setLoading] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);

  const searchBanks = (query) => {
    let newData = filter(
      get(banksData, 'initialData'),
      (bank) =>
        includes(
          String(bank[categorySelected]).toLowerCase(),
          query.toLowerCase()
        ) // BANK_ID needs to be converted to string for includes function to work
    );
    setBanksData({ ...banksData, filteredData: newData });
  };

  useEffect(() => {
    setLoading(true);
    getAllBanksData(citySelected)
      .then((result) => result.json())
      .then((data) => {
        setLoading(false);
        setBanksData({ initialData: data, filteredData: data });
      })
      .catch((e) => {
        setLoading(false);
        notification.error('Something went wrong');
      });
  }, [citySelected]);

  return (
    <Spin spinning={loading}>
      <div className="screen-title">All Banks</div>
      <Row className="search-bar">
        <Col span={18} push={6}>
          <Row align="end">
            <Space>
              <Select
                value={citySelected}
                onChange={(value) => setCitySelected(value)}
              >
                {map(cities, (city, i) => (
                  <Option key={i} value={get(city, 'value')}>
                    {get(city, 'label')}
                  </Option>
                ))}
              </Select>
              <Select
                value={categorySelected}
                onChange={(value) => setCategorySelected(value)}
              >
                {map(categories, (category, i) => (
                  <Option key={i} value={get(category, 'value')}>
                    {get(category, 'label')}
                  </Option>
                ))}
              </Select>
            </Space>
          </Row>
        </Col>
        <Col span={6} pull={18}>
          <Input
            placeholder="Search on the basis of category selected..."
            allowClear
            size="large"
            onChange={(e) => searchBanks(e.target.value)}
          />
        </Col>
      </Row>
      <Table
        columns={allbanksColumn({
          addToFavorites,
          removeFromFavorites,
          userData,
        })}
        dataSource={get(banksData, 'filteredData')}
      />
    </Spin>
  );
};
export default AllBanksScreen;
