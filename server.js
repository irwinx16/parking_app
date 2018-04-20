const express = require('express');
const app = express ();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require("method-override");
// const session = require('express-session');

const PORT = 3000;

//--------------DATABASE----------------//
require('./db/db');

//--------------MIDDLEWARE--------------//
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(expressLayouts);



//--------------CONTROLLERS--------------//
const logController = require('./controllers/login')
app.use('/', logController);
const homeController = require('./controllers/home');
app.use('/home', homeController);




app.listen(3000, () => {
	console.log("Server is listening on Port: " + PORT)
});