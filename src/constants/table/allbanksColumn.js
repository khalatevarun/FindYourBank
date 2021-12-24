import { get } from 'lodash';

export const allbanksColumn = () => [
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
];
