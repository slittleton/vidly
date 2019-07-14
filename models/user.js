const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
    maxlength: 1024,
    unique: true
  },
  isAdmin: {
    type: Boolean
  }
});

userSchema.methods.generateAuthToken = function(){
  // the second argument for jwt.sign() is private key used to create
  // a digital signature
  // secret key should be set as env variable using config (npm i config)
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));

  return token
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(7).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  }
  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;