import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://budgetsite.shop:5000/api/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error('Błąd:', err));
  }, []);

  return (
    <section id="dashboard" className="tab-content">
      <h2>Dashboard</h2>
      <div className="cards-wrapper">
        {transactions.map((item) => (
          <div className="transaction-card" key={item._id}>
            <div className="card-header">
              <span className={`type ${item.amount >= 0 ? 'income' : 'expense'}`}>
                {item.amount >= 0 ? 'Przychód' : 'Wydatek'}
              </span>
              <span className="amount">{item.amount} zł</span>
            </div>
            <div className="card-body">
              <p><strong>Kategoria:</strong> {item.category || 'Brak'}</p>
              <p><strong>Opis:</strong> {item.description}</p>
              <p><strong>Data:</strong> {new Date(item.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
