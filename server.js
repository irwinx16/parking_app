const express = require('express');
const app = express ();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require("method-override");
const session = require('express-session');
const PORT = 3000;

//--------------DATABASE----------------//
require('./db/db');

app.use(session({
	secret: 'this would be some random string you would store',
	resave: false,
	//Only when we add a property to the session do we save it. Don't save useless info to the session. 
	saveUninitialized: false,
	//When this is true, it means you only store with HTTP sites/adds a layter of security
	//using false now because we are only working locally
	cookie: {secure: false}
}))

//--------------MIDDLEWARE--------------//
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));



//--------------CONTROLLERS--------------//
const logController = require('./controllers/login')
app.use('/', logController);
const homeController = require('./controllers/home');
app.use('/home', homeController);
const spotController = require('./controllers/spots');
app.use('/myspots', spotController);




app.listen(3000, () => {
	console.log("Server is listening on Port: " + PORT)
});