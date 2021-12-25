import { Col, Row, Select, Space, Spin, Table, Input } from 'antd';
import { allbanks_dummyData } from '../../constants/dummyData';
import { allbanksColumn } from '../../constants/table/allbanksColumn';
import { categories, cities } from '../../constants/customOptions';
import map from 'lodash/map';
import get from 'lodash/get';
import './style.scss';

const { Option } = Select;
const AllBanksScreen = () => {
  return (
    <Spin spinning={false}>
      <div className="screen-title">All Banks</div>
      <Row className="search-bar">
        <Col span={18} push={6}>
          <Row align="end">
            <Space>
              <Select>
                {map(categories, (category, i) => (
                  <Option key={i} value={get(category, 'value')}>
                    {get(category, 'label')}
                  </Option>
                ))}
              </Select>

              <Select>
                {map(cities, (city, i) => (
                  <Option key={i} value={get(city, 'value')}>
                    {get(city, 'label')}
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
      <Table columns={allbanksColumn()} dataSource={allbanks_dummyData} />
    </Spin>
  );
};
export default AllBanksScreen;
