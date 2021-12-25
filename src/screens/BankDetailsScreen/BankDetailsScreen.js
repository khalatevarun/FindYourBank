import { useParams } from 'react-router-dom';

const BankDetailsScreen = (props) => {
  let { ifsc } = useParams();
  console.log(ifsc);

  return <div>Bank Details</div>;
};
export default BankDetailsScreen;
