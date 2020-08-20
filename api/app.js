const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

//Import Routes
const motesRoute = require('./routes/motes');

// Middlewares
app.use(bodyParser.json());
app.use('/motes', motesRoute);

//Connect to MongoDB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connected to MongoDB');
  }
);

//How we start listening to the server
app.listen(3000);
