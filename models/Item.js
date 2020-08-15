// Mongoose needs models to interact with the database and store data in it
// So we create a model for the item and export it

const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create Schema
const ItemSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);
