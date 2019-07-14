const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const {Genre, validateGenre} = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


// const genreSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50
//   }
// })
// const Genre =  new mongoose.model('Genre', genreSchema);

// below we have put the value of genreSchema as the second parameter becuase genreSchema 
// variable was only being used once, and this makes the code slightly cleaner 

// const Genre = mongoose.model('Genre', new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50
//   }
// }));

// GET =========================================================


router.get('/', async (req, res, next)=>{

    const genres = await Genre.find().sort({name: 1})
    res.send(genres);
});

router.get('/:id', async (req,res)=>{
  const genre = await Genre.findById(req.params.id);
  if(!genre) res.status(404).send('Genre ID does not exist');
  res.send(genre);
})

// POST =========================================================
router.post('/', auth,async (req,res) => {

  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name })
  genre = await genre.save()

  res.send(genre)
});

// PUT =========================================================

router.put('/:id', auth, async (req, res) => {
  // validate genre received in request before attempting to add it to database
  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // Find and update document
  const genre = await Genre
    .findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true})

  if(!genre)  return res.status(404).send('Genre ID does not exist');

  res.send(genre);
})

// DELETE =========================================================

router.delete('/:id', [auth, admin], async (req,res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if(!genre) return res.status(404).send('Genre ID does not exist');

  res.send(genre)
})

// Validation SCHEMA =========================================
// function validateGenre(genre){
//   const schema = { name: Joi.string().min(3).required() };
//   return Joi.validate(genre, schema);
// }


module.exports = router;