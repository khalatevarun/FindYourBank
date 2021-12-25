import get from 'lodash/get';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { find, includes } from 'lodash';

export const allbanksColumn = ({
  removeFromFavorites,
  addToFavorites,
  userData,
}) => [
  {
    title: 'Bank',
    key: 'bank_name',
    render: (record) => <div>{get(record, 'bank_name')}</div>,
  },
  {
    title: 'IFSC',
    key: 'ifsc',
    render: (record) => <div>{get(record, 'ifsc')}</div>,
  },
  {
    title: 'Branch',
    key: 'branch',
    render: (record) => <div>{get(record, 'branch')}</div>,
  },
  {
    title: 'Bank ID',
    key: 'bank_id',
    render: (record) => <div>{get(record, 'bank_id')}</div>,
  },
  {
    title: 'Address',
    key: 'address',
    render: (record) => <div>{get(record, 'address')}</div>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => {
      if (find(get(userData, 'favorites'), record)) {
        return (
          <HeartFilled
            onClick={() => removeFromFavorites(get(record, 'ifsc'))}
          />
        );
      } else {
        return <HeartOutlined onClick={() => addToFavorites(record)} />;
      }
    },
  },
];
