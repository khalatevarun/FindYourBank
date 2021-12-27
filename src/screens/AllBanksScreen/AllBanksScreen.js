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
import { myLocalStorage } from '../../utility/localStorageWrapper';
import { useMyContext } from '../../utility/contextProvider/myContext';
import { citiesInIndia } from '../../constants/cityData';

const { Option } = Select;
const AllBanksScreen = () => {
  const [citySelected, setCitySelected] = useState('MUMBAI');
  const [loading, setLoading] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);

  const {
    userData,
    addToFavorites,
    removeFromFavorites,
    banksData,
    setBanksData,
  } = useMyContext();

  const searchBanks = (query) => {
    let newData;
    if (categorySelected) {
      newData = filter(
        get(banksData, 'initialData'),
        (bank) =>
          includes(
            String(bank[categorySelected]).toLowerCase(),
            query.toLowerCase()
          ) // BANK_ID needs to be converted to string for includes function to work
      );
    } else {
      // if no category is selected then json.stringify the whole object and search in it everywhere

      newData = filter(get(banksData, 'initialData'), (bank) => {
        let searchObject = JSON.stringify(bank);

        return includes(searchObject.toLowerCase(), query.toLowerCase());
      });
    }

    setBanksData({ ...banksData, filteredData: newData });
  };

  useEffect(() => {
    setLoading(true);
    getAllBanksData(citySelected)
      .then((data) => {
        setLoading(false);
        setBanksData({ initialData: data, filteredData: data });
        myLocalStorage.setItem(citySelected, JSON.stringify(data), 10000);
      })
      .catch((e) => {
        setLoading(false);
        notification.error({ message: 'Something went wrong' });
      });
  }, [citySelected, setBanksData]);

  return (
    <Spin spinning={loading}>
      <div className="screen-title">All Banks</div>
      <Row className="search-bar">
        <Col span={18} push={6}>
          <Row align="end">
            <Space>
              <Select
                showSearch
                value={citySelected}
                onChange={(value) => setCitySelected(value)}
              >
                {map(citiesInIndia, (city, i) => (
                  <Option key={i} value={city.toUpperCase()}>
                    {city}
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
