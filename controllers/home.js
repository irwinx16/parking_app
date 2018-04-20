const express = require('express');
const router = express.Router();


//GET ROUTE TO HOME PAGE
router.get('/', (req, res) => {

	res.render('home/home.ejs');

});

module.exports = router;