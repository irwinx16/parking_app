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
router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if(err) {
			console.log("That didn't work. Session still running. ", err)
		} else {
			console.log("Logout Succesful. Session Destroyed")
			res.redirect('/')
		}
	})	
})

module.exports = router;
