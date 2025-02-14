// components
import Card from '../components/Card/Card';
import Layout from '../components/Layout/Layout';
import History from '../components/History/History';
import HistorySQL from '../components/History/HistorySQL';
import Divider from '../components/Divider/Divider';

const Transactions: React.FC = () => (
  <Layout>
    <Divider />

    <h1 className='title no-select'>Cartões</h1>

    <div className='cards'>
      <Card
        number='5244 2150 8252 ****'
        cvcNumber='824'
        validUntil='10 / 30'
        cardHolder='DIEGO CARDOSO'
      />
    </div>

    <Divider />

<HistorySQL />





    <Divider />
  </Layout>
);

export default Transactions;
