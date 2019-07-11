const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

// SCHEMA
const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true,
    default: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10
  }
})

// MODEL
const Customer = mongoose.model('Customer', customerSchema)

// Validate Customer ===============================================
function validateCustomer(customer) {
  const schema = { 
    isGold: Joi.boolean(),
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(7).max(50).required()
  }
  return Joi.validate(customer, schema);
}




module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer