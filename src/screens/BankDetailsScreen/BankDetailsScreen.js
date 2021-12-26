import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Col, Popconfirm, Row } from 'antd';
import find from 'lodash/find';
import get from 'lodash/get';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMyContext } from '../../utility/contextProvider/myContext';
import './style.scss';

const BankDetailsScreen = () => {
  let { ifsc } = useParams();

  const { addToFavorites, removeFromFavorites, banksData, userData } =
    useMyContext();

  const currentBankObject = find(
    get(banksData, 'initialData'),
    function (bank) {
      return get(bank, 'ifsc') === ifsc;
    }
  );

  console.log(userData);
  return (
    <>
      <div className="screen-title">Bank Details</div>
      <div className="bank_details_container">
        <div className="bank_detais_icon">
          {find(get(userData, 'favorites'), function (bank) {
            return get(bank, 'ifsc') === ifsc;
          }) ? (
            <Popconfirm
              title="Are you sure to remove the bank from favorites?"
              onConfirm={() =>
                removeFromFavorites(get(currentBankObject, 'ifsc'))
              }
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <HeartFilled className="icon_medium" />
            </Popconfirm>
          ) : (
            <HeartOutlined
              onClick={() => addToFavorites(currentBankObject)}
              className="icon_medium"
            />
          )}
        </div>
        <Row className="bank_details_row">
          <Col span={8}>
            <div className="bank_details_label">NAME</div>
            <div className="bank_details_value">
              {get(currentBankObject, 'bank_name')}
            </div>
          </Col>
          <Col span={8}>
            <div className="bank_details_label">BRANCH</div>
            <div className="bank_details_value">
              {get(currentBankObject, 'branch')}
            </div>
          </Col>
          <Col span={8}>
            <div className="bank_details_label">BANK ID</div>
            <div className="bank_details_value">
              {get(currentBankObject, 'bank_id')}
            </div>
          </Col>
        </Row>
        <Row className="bank_details_row">
          <Col span={8}>
            <div className="bank_details_label">IFSC</div>
            <div className="bank_details_value">
              {get(currentBankObject, 'ifsc')}
            </div>
          </Col>
          <Col span={8}>
            <div className="bank_details_label">CITY</div>
            <div className="bank_details_value">
              {get(currentBankObject, 'city')}
            </div>
          </Col>
          <Col span={8}>
            <div className="bank_details_label">DISTRICT</div>
            <div className="bank_details_value">
              {get(currentBankObject, 'district')}
            </div>
          </Col>
        </Row>
        <Row className="bank_details_row">
          <Col span={8}>
            <div className="bank_details_label">STATE</div>
            <div className="bank_details_value">
              {get(currentBankObject, 'state')}
            </div>
          </Col>
          <Col span={8}>
            <div className="bank_details_label">ADDRESS</div>
            <div className="bank_details_value">
              {get(currentBankObject, 'address')}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default BankDetailsScreen;
