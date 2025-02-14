// components
import Layout from '../components/Layout/Layout';
import History from '../components/History/History';
import Divider from '../components/Divider/Divider';

const Transactions: React.FC = () => {
  // Valores das transações
  const transactions = [
    { date: 'Janeiro 29', amount: -127.78, currency: 'R$' },
    { date: 'Janeiro 28', amount: -970.23, currency: '€' },
  ];

  // Taxa de câmbio aproximada (1€ = R$5.40)
  const exchangeRate = 5.40;

  // Conversão para reais e soma total
  const totalInReais = transactions.reduce((total, transaction) => {
    const valueInReais =
      transaction.currency === '€' ? transaction.amount * exchangeRate : transaction.amount;
    return total + valueInReais;
  }, 0);

  return (
    <Layout>
      <Divider />

      <h1 className='title no-select'>Transações</h1>

      {transactions.map((transaction, index) => (
        <div key={index}>
          <History detailed date={transaction.date} dateBalance={`R$ ${transaction.currency === '€' ? (transaction.amount * exchangeRate).toFixed(2) : transaction.amount.toFixed(2)}`} />
          <Divider />
        </div>
      ))}

      <h2 className='title no-select'>Total: R$ {totalInReais.toFixed(2)}</h2>
    </Layout>
  );
};

export default Transactions;
