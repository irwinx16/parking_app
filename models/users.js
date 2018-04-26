const mongoose = require('mongoose');
const Spots = require('./spots.js')

//how all of the objects in the collection will look
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	spots: [Spots.schema]
});

//Creating the collection --> author will be the name of the collection
module.exports = mongoose.model('Users', userSchema);
