const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Customer, validateCustomer } = require('../models/customer');

// GET ==========================================================
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort({name: 1})
  res.send(customers);
})

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if(!customer) res.send(404).send('Customer ID does not exist');
  res.send(customer);
})

// POST =========================================================
router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });

  customer = await customer.save();
  res.send(customer);
})

// PUT ==========================================================
router.put('/:id', async(req, res) => {
  const { error } = validateCustomer(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    }, { new: true });

  if(!customer) return res.status(404).send('Customer ID does not exist');

  res.send(customer);
  })

// DELETE =======================================================
router.delete('/:id', async( req, res )=> {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if(!customer) return res.status(404).send('Customer Id does not exist');

  res.send(customer);
})

module.exports = router;


