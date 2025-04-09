import React, { useState, useEffect } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    amount: ''
  });

  useEffect(() => {
    fetch('http://budgetsite.shop:5000/api/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error('Błąd podczas pobierania danych:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      description: formData.description,
      amount: parseFloat(formData.amount)
    };

    try {
      const res = await fetch('http://budgetsite.shop:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction)
      });

      const saved = await res.json();
      setTransactions((prev) => [saved, ...prev]);
      setFormData({ description: '', amount: '' });
    } catch (err) {
      console.error('Błąd przy dodawaniu:', err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>Lista Transakcji</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="description"
          placeholder="Opis"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <input
          type="number"
          name="amount"
          placeholder="Kwota"
          value={formData.amount}
          onChange={handleChange}
          required
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Dodaj</button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Opis</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Kwota</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item._id}>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
