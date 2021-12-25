import { Col, Row, Select, Space, Spin, Table } from 'antd';
import { allbanksColumn } from '../../constants/table/allbanksColumn';
import get from 'lodash/get';
import { useState } from 'react';

const FavoritesScreen = ({ userData, removeFromFavorites }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Spin spinning={loading}>
      <div className="screen-title">Favorites</div>
      <Table
        columns={allbanksColumn({
          removeFromFavorites,
          userData,
        })}
        dataSource={get(userData, 'favorites')}
      />
    </Spin>
  );
};
export default FavoritesScreen;
