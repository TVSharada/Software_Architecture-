const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mobileSchema = new Schema({
  mobilename: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  rating: {type: Number, required: true, minvalue: 1 }
}, {
  timestamps: true,
});

const Mobile = mongoose.model('Mobilelist', mobileSchema);

module.exports = Mobile;