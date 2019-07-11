const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const app = express();
const mongoose = require('mongoose');

// Connect to database
mongoose.connect("mongodb://localhost/vidly")
  .then(()=> console.log('Connected to MongoDB...'))
  .catch((err)=> console.log('Could not connect to MongoDB', err));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 5000;

// listen to port
app.listen(port, ()=>console.log(`Listening on port ${port}`));



