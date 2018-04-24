const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');

//ROUTE TO LOGIN PAGE
router.get('/', (req, res) => {

	res.render('login/login.ejs', {
		message: req.session.message
	});

});

//ROUTE FOR LOGGING IN
router.post('/login', async (req, res, next) => {

	try {

		const user = await Users.findOne({username: req.body.username})
		
		if(user){

			//compare passwords
			if(bcrypt.compareSync(req.body.password, user.password)){

				req.session.logged = true;
				req.session.username = user.username; 

				res.redirect('/home')

			} else {

				req.session.message = 'Username or Password Incorrect. Please Try Again.'
		
				res.redirect('/')


			}  
		//if the user is null or undefined
		} else {
		
			req.session.message = "Username or Password Incorrect. Please Try Again."

			res.redirect('/')
		}

	} catch (err){

		next (err)
	}

})



//ROUTE TO REGISTER USER
router.post('/registration', async (req, res) => {

	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	const newUser = {
		username: req.body.username,
		password: passwordHash
	}

	try {

		const createdUser = await Users.create(newUser);

		if(createdUser){
			req.session.logged = true;
			req.session.username = createdUser.username;

			res.redirect('/home')

		} else {
			res.redirect('/')
		}
		

	} catch (err) {

		res.send(err)

	}
});

module.exports = router;