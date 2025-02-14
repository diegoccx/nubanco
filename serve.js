import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Banco de dados SQLite persistente (em arquivo)
const db = new sqlite3.Database('./database.db'); // Banco de dados armazenado em arquivo

// Criar tabelas (se ainda não existirem)
db.serialize(() => {
  // Tabela de saldos
  db.run('CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY, bank TEXT, balance REAL)');
  db.run("INSERT INTO accounts (bank, balance) SELECT 'Nubank', 1000.00 WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE bank = 'Nubank')");

  // Tabela de transações
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY,
      bank TEXT,
      time TEXT,
      name TEXT,
      amount REAL,
      color TEXT,
      icon TEXT
    )
  `);

  // Inserir algumas transações de exemplo (caso ainda não existam)
  const transactions = [
    { bank: 'Nubank', time: '16:20', name: 'Pão de Queijo', amount: 5.50, color: 'orange', icon: 'local_cafe' },
    { bank: 'Nubank', time: '13:05', name: 'Feijoada Completa', amount: 32.90, color: 'red', icon: 'restaurant' },
    { bank: 'Nubank', time: '11:30', name: 'Compra no Mercado', amount: 189.75, color: 'green', icon: 'shopping_cart' },
    { bank: 'Nubank', time: '10:10', name: 'Ingresso Jogo do Palmeiras', amount: 120.00, color: 'blue', icon: 'sports_soccer' },
    { bank: 'Nubank', time: '15:45', name: 'Açaí com Morango', amount: 18.50, color: 'purple', icon: 'icecream' },
    { bank: 'Nubank', time: '08:20', name: 'Corrida de Uber', amount: 27.90, color: 'gray', icon: 'directions_car' },
    { bank: 'Nubank', time: '07:50', name: 'Conta de Luz', amount: 85.40, color: 'yellow', icon: 'bolt' },
  ];

  // Inserir transações apenas se não existirem
  transactions.forEach(({ bank, time, name, amount, color, icon }) => {
    db.run('INSERT OR IGNORE INTO transactions (bank, time, name, amount, color, icon) VALUES (?, ?, ?, ?, ?, ?)', [bank, time, name, amount, color, icon]);
  });
});

// Rota para obter saldo
app.get('/saldo/:bank', (req, res) => {
  const { bank } = req.params;
  db.get('SELECT balance FROM accounts WHERE bank = ?', [bank], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Banco não encontrado' });
    }
    res.json({ saldo: row.balance });
  });
});

// Rota para adicionar saldo
app.post('/saldo/adicionar', (req, res) => {
  const { bank, amount } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Valor inválido' });
  }

  db.run(
    'UPDATE accounts SET balance = balance + ? WHERE bank = ?',
    [amount, bank],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Banco não encontrado' });
      }
      res.json({ message: `Saldo atualizado com sucesso!` });
    }
  );
});

// Rota para obter o histórico de transações
app.get('/historico/:bank', (req, res) => {
  const { bank } = req.params;
  db.all('SELECT * FROM transactions WHERE bank = ? ORDER BY time DESC', [bank], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Rota para adicionar um novo gasto
app.post('/historico/adicionar', (req, res) => {
  const { bank, time, name, amount, color, icon } = req.body;
  
  console.log('Dados recebidos para adicionar ao histórico:', req.body); // Log dos dados recebidos

  if (!time || !name || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  db.run(
    'INSERT INTO transactions (bank, time, name, amount, color, icon) VALUES (?, ?, ?, ?, ?, ?)',
    [bank, time, name, amount, color, icon],
    function (err) {
      if (err) {
        console.error('Erro ao adicionar transação:', err); // Log do erro
        return res.status(500).json({ error: err.message });
      }
      console.log('Transação adicionada com sucesso!'); // Log de sucesso
      res.json({ message: 'Gasto adicionado com sucesso!' });
    }
  );
});

// Rota para deletar um histórico pelo ID
app.delete('/historico/deletar/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Histórico não encontrado' });
    }
    res.json({ message: `Histórico com ID ${id} deletado com sucesso!` });
  });
});

// Rota para alterar um histórico pelo ID
app.put('/historico/alterar/:id', (req, res) => {
  const { id } = req.params;
  const { bank, time, name, amount, color, icon } = req.body;

  if (!time || !name || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Dados inválidos para atualização' });
  }

  db.run(
    'UPDATE transactions SET bank = ?, time = ?, name = ?, amount = ?, color = ?, icon = ? WHERE id = ?',
    [bank, time, name, amount, color, icon, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Histórico não encontrado' });
      }
      res.json({ message: `Histórico com ID ${id} atualizado com sucesso!` });
    }
  );
});


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
