const express = require('express');
const router = express.Router();
const User = require('../models/users.js')
const Spot = require('../models/spots.js')

//ROUTE TO MY SPOTS INDEX

router.get('/', async (req,res) => {

	// if(req.session.logged) {
	// 	try {
	// 		//await - wait for the db response
	// 		const theArticlesIFound = await Articles.find();

	// 		res.render('spots/index.ejs', {
	// 			articles: theArticlesIFound,
	// 			username: req.session.username
	// 		})

	// 	} catch (err){

	// 		res.send(err);

	// 	}
	// } else {
	// 	req.session.message = "Please Login."
	// 	res.redirect('/');
	// }
});

module.exports = router;