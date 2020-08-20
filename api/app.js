const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Import Routes
const motesRoute = require('./routes/motes');

// Middlewares
app.use('/motes', motesRoute);

//Connect to MongoDB
mongoose.connect('localhost:27017', { useNewUrlParser: true }, () => {
  console.log('Connected to MongoDB');
});

//How we start listening to the server
app.listen(3000);
