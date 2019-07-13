const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
const auth = require('../middleware/auth');

//GET ============================================================
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name')
  res.send(movies);
})

router.get('/:id', async (req, res) =>{
  const movie = await Movie.findById(req.params.id);
  if(!movie) res.send(404).send('Movie ID does not exist');
  res.send(movie);
})

// POST ===========================================================
router.post('/', auth, async (req, res) => {
  const { error } = validateMovie(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  let movie = new Movie({ 
    title: req.body.title,
    genre: { // in the request this looks like "genreId": "somelongIDnumber"
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
/* Example of post request through postman
  {
    "title": "Terminator",
    "genreId": "5d266eab96e23a1254c2502f",
    "numberInStock": 9,
    "dailyRentalRate": 2
  } 
*/


  movie = await movie.save();
  
  res.send(movie);
});

// PUT ============================================================
router.put('/:id', auth, async (req,res) => {
  const { error } = validateMovie(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send('Invalid genre');
  
  const movie = await Movie
    .findByIdAndUpdate( req.params.id, {
      title: req.body.title,
      genre: {
        _id: genre.id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });
  
  if(!movie) return res.status(404).send('Movie ID does not exist');
  res.send(movie);
})

// DELETE =========================================================
router.delete('/:id', auth,  async ( req,res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if(!movie) return res.status(404).send('Movie ID does not exist');
  res.send(movie);
})


module.exports = router;