import { Link } from 'react-router-dom';

// components
import HistoryLine from './HistoryLine';

// interfaces
interface IProps {
  date?: string;
  detailed?: boolean;
  dateBalance?: string;
}

const History: React.FC<IProps> = ({
  date = undefined,
  detailed = false,
  dateBalance = undefined,
}) => (
  <>
    {detailed && (
      <div className='history-header flex flex-v-center flex-space-between'>
        <span className='text-shadow no-select date'>{date}</span>
        <span className='text-shadow no-select amount flex flex-end'>{dateBalance}</span>
      </div>
    )}
    <div className='history'>
      <HistoryLine
        item={{
          id: 1,
          icon: 'local_cafe',
          time: '16:20',
          name: 'Pão de Queijo',
          amount: 5.50,
          color: 'orange',
          currencySymbol: 'R$',
        }}
      />
      <HistoryLine
        item={{
          id: 2,
          icon: 'restaurant',
          time: '13:05',
          name: 'Feijoada Completa',
          amount: 32.90,
          color: 'red',
          currencySymbol: 'R$',
        }}
      />
      <HistoryLine
        item={{
          id: 3,
          icon: 'shopping_cart',
          time: '11:30',
          name: 'Compra no Mercado',
          amount: 189.75,
          color: 'green',
          currencySymbol: 'R$',
        }}
      />
      <HistoryLine
        item={{
          id: 4,
          icon: 'sports_soccer',
          time: '10:10',
          name: 'Ingresso Jogo do Palmeiras',
          amount: 120.00,
          color: 'blue',
          currencySymbol: 'R$',
        }}
      />
      <HistoryLine
        item={{
          id: 5,
          icon: 'icecream',
          time: '15:45',
          name: 'Açaí com Morango',
          amount: 18.50,
          color: 'purple',
          currencySymbol: 'R$',
        }}
      />
      <HistoryLine
        item={{
          id: 6,
          icon: 'directions_car',
          time: '08:20',
          name: 'Corrida de Uber',
          amount: 27.90,
          color: 'gray',
          currencySymbol: 'R$',
        }}
      />
      <HistoryLine
        item={{
          id: 7,
          icon: 'bolt',
          time: '07:50',
          name: 'Conta de Luz',
          amount: 85.40,
          color: 'yellow',
          currencySymbol: 'R$',
        }}
      />
      {!detailed && (
        <Link to='/transactions' className='history-line bottom flex flex-v-center flex-h-center'>
          Ver tudo
          <span className='material-symbols-outlined'>keyboard_arrow_right</span>
        </Link>
      )}
    </div>
  </>
);

export default History;
