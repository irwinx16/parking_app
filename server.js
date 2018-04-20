const express = require('express');
const app = express ();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')

const PORT = 3000;

//--------------DATABASE----------------//
require('./db/db');

//--------------MIDDLEWARE--------------//
app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');



//--------------CONTROLLERS--------------//
const homeController = require('./controllers/home');
//map every route starting with a / to be /authors
app.use('/', homeController);




app.listen(3000, () => {
	console.log("Server is listening on Port: " + PORT)
});