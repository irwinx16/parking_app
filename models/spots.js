const mongoose = require('mongoose');

//how all of the objects in the collection will look
const spotSchema = new mongoose.Schema({
	username: String,
	spotname: String
});

//Creating the collection --> author will be the name of the collection
module.exports = mongoose.model('Spots', spotSchema);