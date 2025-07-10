const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'pending'],
    default: 'confirmed'
  }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
