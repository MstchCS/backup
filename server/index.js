console.log("🟣 Startuję index.js...");

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const transactionRoutes = require('./routes/transactions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log("🟣 Odebrano żądanie GET /api/test");
  res.send('✅ Działa!');
});

// Routes
app.use('/api/transactions', transactionRoutes);

// MongoDB connection + server start
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/budgetapp';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("✅ Połączono z MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Serwer Express działa na porcie ${PORT}`);
    });
  })
  .catch(err => console.error("❌ Błąd MongoDB:", err));
