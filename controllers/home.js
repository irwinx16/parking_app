const express = require('express');
const router = express.Router();


//GET ROUTE TO HOME PAGE
router.get('/', (req, res) => {



	if (req.session.logged){
		
		res.render('home/home.ejs');

	} else {

		req.session.message = "Please Login!"
		res.redirect('/')
	}
});

//ROUTE TO LOG OUT
router.get('/', (req, res) => {

	res.send('LOGOUT')

// 	// req.session.logged = false;
// 	req.session.message = "Succesful Logout."
// 	// res.rerender('/');
})

module.exports = router;