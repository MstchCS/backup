const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET wszystkie transakcje
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    console.error("❌ Błąd przy pobieraniu transakcji:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
});

// POST nowa transakcja
router.post('/', async (req, res) => {
  const { type, category, amount, description } = req.body;

  if (!type || !category || !amount) {
    return res.status(400).json({ message: "Brakuje wymaganych danych" });
  }

  try {
    const newTransaction = new Transaction({
      type,
      category,
      amount,
      description
    });

    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Błąd przy zapisie transakcji:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
});

module.exports = router;
