import { Col, Row } from 'antd';
import find from 'lodash/find';
import get from 'lodash/get';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const BankDetailsScreen = (props) => {
  let { ifsc } = useParams();
  console.log(ifsc);

  const [currentBankObject, setCurrentObject] = useState(
    find(get(props, 'banksData.initialData'), function (bank) {
      return get(bank, 'ifsc') === ifsc;
    })
  );

  console.log(currentBankObject);

  return (
    <>
      <div className="screen-title">Bank Details</div>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </>
  );
};
export default BankDetailsScreen;
