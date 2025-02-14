// components
import Saved from '../components/Add/Saved';
import Arrow from '../components/Arrow/Arrow';
import Button from '../components/Form/Button';
import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';
import Destination from '../components/Add/Destination';

const Add: React.FC = () => (
  <Layout>
    <Divider />

    <h1 className='title no-select'>Adicionar dinheiro</h1>

    <Saved />

    <Arrow />

    <Destination />

    <Divider />



    <Divider />
  </Layout>
);

export default Add;
