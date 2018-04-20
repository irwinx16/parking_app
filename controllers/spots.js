const express = require('express');
const router = express.Router();
const User = require('../models/users.js')
const Spot = require('../models/spots.js')

//ROUTE TO MY SPOTS INDEX

router.get('/', async (req,res) => {

	res.render('spots/index.ejs')	

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

	res.send('Post Spot')

});

module.exports = router;

