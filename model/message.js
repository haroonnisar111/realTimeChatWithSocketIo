// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  orderID: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  quantity: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  transporter: { type: String },
});

module.exports = mongoose.model('Message', messageSchema);
