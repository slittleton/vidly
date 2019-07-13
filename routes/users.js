const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, validateUser } = require('../models/user');


// POST - Register User ============================================
router.post('/', async(req, res)=> {
  const { error } = validateUser(req.body);
  if(error) res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  user = new User(_.pick(req.body, ['name','email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router