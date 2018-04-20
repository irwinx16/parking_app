const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {

// 	res.render('home/home.ejs');


let request = require('request');
let url = 'https://data.cityofchicago.org/resource/ys7w-i4tk.json'
request(url, (err, response, body) => {
  let zones = JSON.parse(body);
  console.log(zones[0].address_range_low);
console.log(zones[0].address_range_high);
console.log(zones[0].street_direction);
console.log(zones[0].street_name);
console.log(zones[0].street_type);
console.log(zones[0].zone);

});









module.exports = router;