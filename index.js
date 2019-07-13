
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')){
  console.log('FATAL ERROR: jwtPrivateKey is not defined')
  process.exit(1) 
    // 0 as argument means success, any other character indicates 
    // failure and triggers exit()
}

// Connect to database
mongoose.connect("mongodb://localhost/vidly")
  .then(()=> console.log('Connected to MongoDB...'))
  .catch((err)=> console.log('Could not connect to MongoDB', err));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

// listen to port
app.listen(port, ()=>console.log(`Listening on port ${port}`));



