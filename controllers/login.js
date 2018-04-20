const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');

//ROUTE TO LOGIN PAGE
router.get('/', (req, res) => {

	res.render('login/login.ejs');

});

//ROUTE FOR LOGGING IN
router.post('/login', async (req, res, next) => {

	// try {

	// 	const user = await User.findOne({username: req.body.username})
		
	// 	if(user){

	// 		//compare passwords
	// 		if(bcrypt.compareSync(req.body.password, user.password)){

	// 			req.session.logged = true;
	// 			req.session.username = user.username; 

	// 			console.log('----------------------------------------')
	// 			console.log('USERS MATCH!')
	// 			console.log('----------------------------------------')

	// 			res.redirect('/articles');

	// 		} else {

	// 			// req.session.message = 'Username or Password Incorrect. Please Try Again.'
	// 			console.log('----------------------------------------')
	// 			console.log('USERNAMES DONT MATCH!')
	// 			console.log('----------------------------------------')
	// 			res.redirect('/')


	// 		}  
	// 	//if the user is null or undefined
	// 	} else {
		
	// 		// req.session.message = "Username or Password Incorrect. Please Try Again."
	// 		console.log('----------------------------------------')
	// 		console.log('USER NULL!')
	// 		console.log('----------------------------------------')
	// 		res.redirect('/')
	// 	}

	// } catch (err){

	// 	next (err)
	// }

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