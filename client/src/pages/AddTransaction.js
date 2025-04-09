import React, { useState } from 'react';

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    description: '',
    amount: ''
  });

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

      if (res.ok) {
        alert('Transakcja dodana!');
        setFormData({ description: '', amount: '' });
      } else {
        alert('Błąd podczas dodawania transakcji');
      }
    } catch (err) {
      console.error('Błąd:', err);
    }
  };

  return (
    <div className="container">
      <h2>Dodaj Transakcję</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="description"
          placeholder="Opis"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Kwota"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
};

export default AddTransaction;
