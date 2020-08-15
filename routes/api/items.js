// This file contains the apis for GET, POST and DELETE requests.

const express = require('express');
const router = express.Router(); // This will be used as the router to handle the requests

// Item Model
const Item = require('../../models/Item'); // Loads the Item model in this file

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => { // Note: We write a slash ('/') as the parameter as we are already in the required route 
  Item.find() // The find method returns all the documents in the collection
    .sort({ date: -1 }) // This sorts the documents in descending(-1) order of the date
    .then(items => res.json(items)) // We return the documents in JSON format
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name // Since we have used the body_parser middleware, we can access the name usifn req.body.name
  });

  newItem.save().then(item => res.json(item)); // Saves the item in the database
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id) // Finds the document to be deleted
    .then(item => item.remove().then(() => res.json({success: true}))) // Deletes the document if it is found in the collection
    .catch(err => res.status(404).json({success: false})); // Returns an error message if the document isn't found
});


module.exports = router;
