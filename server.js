const express = require('express');
const mongoose = require('mongoose'); // ORM to interact with the MongoDB database
const bodyParser = require('body-parser'); // Acts as a middleware while receiving data from POST requests

const items = require('./routes/api/items') // We load the routes (items.js) module onto the server

const app = express(); // Express is the framework being used here

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI; // We bring the MongoDB URI into the server file 

// Connect to Mongo
mongoose
  .connect(db) // This ia a promis based function so you can have seperate responses if the function is successfull or it gives an error
  .then(() => console.log('MongoDB Connected...')) // Then fucntion gives a successful response
  .catch(err => console.log(err)); // Catch function catches the error

// Use Routes
app.use('/api/items', items); // Any request that is sent to the /api/items route is directed to the items.js module

const port = process.env.PORT || 5000; // This sets the port where the application will run

app.listen(port, () => console.log(`Server started on port ${port}`));