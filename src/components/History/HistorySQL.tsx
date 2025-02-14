import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import HistoryLine from './HistoryLine'; // Importando o componente HistoryLine

interface Transaction {
  id: number;
  bank: string;
  time: string;
  name: string;
  amount: number;
  color: string;
  icon: string;
}

const HistorySQL: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransaction, setNewTransaction] = useState({
    bank:'',
	time: '',
    name: '',
    amount: '',
    color: '',
    icon: '',
  });

  // Função para buscar histórico de transações
  const fetchTransactions = async () => {
    try {
      const resposta = await fetch('http://localhost:3001/historico/Nubank');
      const dados = await resposta.json();
      setTransactions(dados);
      console.log(dados);
    } catch (erro) {
      console.error('Erro ao buscar histórico:', erro);
    }
  };

  // Função para adicionar novo gasto
  const addTransaction = async () => {
 const amountNumber = Number(newTransaction.amount);   

   if (!newTransaction.time || !newTransaction.name || !newTransaction.amount || amountNumber <= 0) {
      alert('Por favor, preencha todos os campos corretamente');
      return;
    }

    try {
      const transactionData = {
      ...newTransaction,
      bank: 'Nubank',
      amount: amountNumber, // Converte para número antes de enviar
    };
	   // Simulando um erro "oculto" que aparece apenas no console
     
	 if(amountNumber > 5000){
	 setTimeout(() => {
     throw new Error('Erro VALOR ACIMA DE 5000');
     }, 1000);
	 }
  
  else{
	  const resposta = await fetch('http://localhost:3001/historico/adicionar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
      const dados = await resposta.json();
      alert(dados.message);
      fetchTransactions();
}
	  // Atualizar o histórico após adicionar o gasto
    } catch (erro) {
      console.error('Erro ao adicionar gasto:', erro);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <div className='history'>
        {transactions.map((transaction) => (
          <HistoryLine
            key={transaction.id}
            item={{
              id: transaction.id,
              icon: transaction.icon,
              name: transaction.name,
              time: transaction.time,
              color: transaction.color,
              amount: transaction.amount,
              currencySymbol: 'R$', // Exemplo de símbolo de moeda
            }}
          />
        ))}
      </div>

      <div className='add-transaction'>
        <input
          type='text'
          placeholder='Hora'
          value={newTransaction.time}
          onChange={(e) => setNewTransaction({ ...newTransaction, time: e.target.value })}
        />
        <input
          type='text'
          placeholder='Nome do gasto'
          value={newTransaction.name}
          onChange={(e) => setNewTransaction({ ...newTransaction, name: e.target.value })}
        />
       <input
  type='number'
  placeholder='Valor'
  value={newTransaction.amount}
 onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
/>
        <input
          type='text'
          placeholder='Cor'
          value={newTransaction.color}
          onChange={(e) => setNewTransaction({ ...newTransaction, color: e.target.value })}
        />
        <input
          type='text'
          placeholder='Ícone'
          value={newTransaction.icon}
          onChange={(e) => setNewTransaction({ ...newTransaction, icon: e.target.value })}
        />
        <button onClick={addTransaction}>Adicionar Gasto</button>
      </div>

      <Link to='/transactions'>Ver todas as transações</Link>
    </div>
  );
};

export default HistorySQL;
