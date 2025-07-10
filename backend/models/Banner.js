// models/Banner.js
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  location: { type: String, required: true },
  bannerImage: { type: String, required: true } // file path for image
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);
