// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
  date: { type: Date, required: true },
  availableTickets: { type: Number, required: true },
  ticketPrice: { type: Number, required: true },
  image: { type: String } // store image path
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
