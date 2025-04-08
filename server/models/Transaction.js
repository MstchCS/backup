const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: String,
  category: String,
  amount: Number,
  description: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
