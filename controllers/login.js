const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');

//ROUTE TO LOGIN PAGE
router.get('/', (req, res) => {

	res.render('login/login.ejs');

});



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
		res.redirect('/home')

	} catch (err) {

		res.send(err)

	}
});

module.exports = router;