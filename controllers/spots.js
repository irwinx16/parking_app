const express = require('express');
const router = express.Router();
const User = require('../models/users.js')
const Spot = require('../models/spots.js')

//ROUTE TO MY SPOTS INDEX

router.get('/', async (req,res) => {

	try {

		const foundSpots = await Spot.find();
		// console.log(foundSpots) // THIS WORKS
		res.render('spots/index.ejs', {
			spots: foundSpots
		})
		// console.log("----- this is req.body in the / route") 
		// console.log(req.body)
		// console.log("----- this is req.body in the / route")
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



// EDIT PAGE 

router.get('/:id/edit', async (req, res) => {

	try {

		const foundSpot = await Spot.findById(req.params.id)

		console.log("---- this is found spot in the edit route")
		console.log(foundSpot)
		console.log("---- this is found spot in the edit route")

		// console.log("------- this is req.body id/edit route") 
		// console.log(req.body) // THIS RETURNS {}
		// console.log("------- this is req.body id/edit route") 

		// console.log(foundSpot) // THIS WORKS

		const allUsers = await User.find({})

		// console.log(allUsers) // THIS RETURNS NOTHING

		const foundUserSpot = await User.findOne({'spots._id': req.params.id})

		// console.log(foundUserSpot); // THIS RETURNS NULL 

		console.log("------- this is req.body id/edit route") 
		console.log(req.body) // THIS RETURNS {}
		console.log("------- this is req.body id/edit route") 

		res.render('spots/edit.ejs', {
			spot: foundSpot,
			users: allUsers,
			UserSpot: foundUserSpot
		})

	} catch(err) {
		res.send(err)
	}


})


//ROUTE TO SHOW PAGE

router.get('/:id', async (req, res) => {
		
	try {

		const foundSpot = await Spot.findById(req.params.id)
		const foundUser = await User.findOne({'spots._id': req.params.id})
		
		res.render('spots/show.ejs', {
			spot: foundSpot, 
			user: foundUser 
		})

	} catch (err) {
		res.send(err)
	}
})



// EDIT PAGE 

router.get('/:id/edit', async (req, res) => {

	try {

		const foundSpot = await Spot.findById(req.params.id);
		const allUsers = await User.find({});
		const foundSpotUser = await User.findOne({'spots._id': req.params.id});

		res.render('spots/edit.ejs', {
			spot: foundSpot,
			users: allUsers,
			userSpot: foundSpotUser
		})

	} catch(err) {
		res.send(err)
	}


})

//POST ROUTE

router.put('/:id', async (req, res) => {
	try {
		const updatedSpot = await Spot.findByIdAndUpdate(req.params.id, req.body);
		res.redirect('/myspots')

	} catch (err) {
		res.send(err);
	}
})





//ROUTE TO DELETE PAGE

router.delete('/:id', async(req, res)  => {
	try{


	const deletedSpot = await Spot.findByIdAndRemove(req.params.id);
	const foundUser = await User.findOne({'spots._id': req.params.id});

		foundUser.spots.id(req.params.id).remove();
		foundUser.save((err, data) => {
			res.redirect('/myspots');
		});


	} catch(err) {

		res.send(err)
	}
})




module.exports = router;

