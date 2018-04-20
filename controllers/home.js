const express = require('express');
const router = express.Router();


//GET ROUTE TO HOME PAGE
router.get('/', (req, res) => {

// 	res.render('home/home.ejs');

// router level middleware
// router.use((req, res, next)=> {
// 	//check login here if you like
// 	console.log("this route will be hit for every route in /home");
// 	next()
})

router.get('/', (req, res) => {
	res.render('home/home.ejs');
});

router.get('/test', (req, res) => {

	const url = 'https://data.cityofchicago.org/resource/ys7w-i4tk.json'
	request(url, (err, response, body) => {
		// to be sure code runs after the ajax request, 
		// be sure it's in this callback and not after it 
		// because if it's after, it will try to run before the ajax request is finished
		const zones = JSON.parse(body);
		// console.log(zones[0].address_range_low);
		// console.log(zones[0].address_range_high);
		// console.log(zones[0].street_direction);
		// console.log(zones[0].street_name);
		// console.log(zones[0].street_type);
		// console.log(zones[0].zone);

	  	// console.log(req.body); res.send(req.body);
	  	console.log(req.body, ' this is post');
	 

	 	const zoneTest = zones[0].zone;
	 	res.send(zoneTest)

	});
	
	res.render('home/home.ejs');


});

module.exports = router;