const express = require('express');
const router = express.Router();

//ROUTE TO MY SPOTS INDEX

router.get('/', (req,res) => {
	
	res.render('spots/index.ejs');
})


module.exports = router;