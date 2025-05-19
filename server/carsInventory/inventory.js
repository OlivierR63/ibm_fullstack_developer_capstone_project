const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cars = new Schema({
dealer_id: {
    type: Number,
    required: true
},
make: {
    type: String,
    required: true
  },
model: {
    type: String,
    required: true
  },
bodyType: {
    type: String,
    required: true
  },
year: {
    type: Number,
    required: true,
    min: [1886, 'Year must be greater than or equal to 1886, the uar of the firs car']
  },
mileage: {
    type: Number,
    required: true,
    min: [0, 'Mileage must be a positive number']
  },
price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number']
  }
});

module.exports = mongoose.model('cars', cars);