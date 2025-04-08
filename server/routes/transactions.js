const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// ✅ Model transakcji (można przenieść do osobnego pliku models/Transaction.js)
const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// 📥 CREATE - Dodaj nową transakcję
router.post('/', async (req, res) => {
  try {
    const { description, amount } = req.body;
    const newTransaction = new Transaction({ description, amount });
    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Błąd dodawania transakcji', details: err.message });
  }
});

// 📤 READ - Pobierz wszystkie transakcje
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Błąd pobierania danych' });
  }
});

// 📝 UPDATE - Zaktualizuj transakcję po ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Błąd aktualizacji', details: err.message });
  }
});

// 🗑️ DELETE - Usuń transakcję po ID
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Transaction.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json({ message: 'Usunięto transakcję' });
  } catch (err) {
    res.status(500).json({ error: 'Błąd usuwania' });
  }
});

module.exports = router;
