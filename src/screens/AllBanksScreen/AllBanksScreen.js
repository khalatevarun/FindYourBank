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
import './style.scss';
import { getAllBanksData } from '../../utility/api/banksDataAPI';

const { Option } = Select;
const AllBanksScreen = ({ userData, addToFavorites, removeFromFavorites }) => {
  const [citySelected, setCitySelected] = useState('MUMBAI');
  const [loading, setLoading] = useState(false);
  const [banksData, setBanksData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllBanksData(citySelected)
      .then((result) => result.json())
      .then((data) => {
        setLoading(false);
        setBanksData(data);
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
              <Select>
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
          <Input placeholder="Search..." allowClear size="large" />
        </Col>
      </Row>
      <Table
        columns={allbanksColumn({
          addToFavorites,
          removeFromFavorites,
          userData,
        })}
        dataSource={banksData}
      />
    </Spin>
  );
};
export default AllBanksScreen;
