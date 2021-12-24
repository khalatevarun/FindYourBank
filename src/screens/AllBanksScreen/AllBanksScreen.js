import { Spin, Table } from 'antd';
import { allbanks_dummyData } from '../../constants/dummyData';
import { allbanksColumn } from '../../constants/table/allbanksColumn';

const AllBanksScreen = () => {
  return (
    <Spin spinning={false}>
      <div className="screen-title">All Banks</div>
      <Table columns={allbanksColumn()} dataSource={allbanks_dummyData} />
    </Spin>
  );
};
export default AllBanksScreen;
