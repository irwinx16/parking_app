const express = require('express');
const router = express.Router();
const User = require('../models/users.js')
const Spot = require('../models/spots.js')

//ROUTE TO MY SPOTS INDEX

router.get('/', async (req,res) => {

	try {

		const foundSpots = await Spot.find();
		res.render('spots/index.ejs', {
			spots: foundSpots
		})
	} catch (err) {

		res.send(err)
	}


});


//ROUTE TO GET USERS 

router.get('/new', async (req, res) => {

	//get users

	try {

		const allUsers = await User.find({})
		res.render('spots/new.ejs', {
			users: allUsers
		})

	} catch (err) {
		res.send(err)
	}
})

//ROUTE TO ADD SPOT

router.post('/', async (req, res) => {

	try {

		const foundUser = await User.findById(req.body.userId);
		const addedSpot = await Spot.create(req.body);

		foundUser.spots.push(addedSpot);
		foundUser.save((err, data) => {
			res.redirect ('/myspots')
		})
	} catch (err) {
		res.send(err)
	}	

});

//ROUTE TO SHOW PAGE

router.get('/:id', async (req, res) => {
		
	try {
		
		res.render('spots/show.ejs')

	} catch (err) {
		res.send(err)
	}
})

//ROUTE TO DELETE PAGE


module.exports = router;

