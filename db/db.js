const mongoose = require('mongoose');
//would add the port to the connectionString if we weren't operating on the default port
const connectionString = 'mongodb://localhost/parkingApp';

mongoose.connect(connectionString);

mongoose.connection.on('connected', () => {
	console.log("Mongoose Connected to DB");
})

mongoose.connection.on('error', (err) => {
	console.log('Mongoose Error: ', err);
})

mongoose.connection.on('disconnected', () => {
	console.log('Mongooose Disconnected');
})