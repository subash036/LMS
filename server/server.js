// server.js
// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/userSchema');
var db = mongoose.connect('mongodb://localhost:27017/test'); // connect to our database
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
var port = process.env.PORT || 8080; // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
	res.json({
		message: 'hooray! welcome to our api!'
	});
});
// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
// middleware to use for all requests
router.use(function (req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
	res.json({
		message: 'hooray! welcome to our api!'
	});
});
router.route('/user')
	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function (req, res) {
		var user = new User(); // create a new instance of the Bear model
		user.username = req.body.username, user.password = req.body.password;
		// set the bears name (comes from the request)
		// save the bear and check for errors
		console.log(req.body.username);
		user.save(function (err) {
			if (err) {
				res.send(err);
			};
			res.json({
				message: user.username + ' with Pass ' + req.body.password + ' created!'
			});
		});
	}).get(function (req, res) {
		User.find(function (err, user) {
			if (err) res.send(err);
			res.json(user);
		});
	}).delete(function (req, res) {
		User.remove({
			//			_id: req.params.bear_id
		}, function (err, user) {
			if (err) res.send(err);
			res.json({
				message: 'Successfully deleted'
			});
		});
	});
router.route('/register')
	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function (req, res) {
		var user = new User(); // create a new instance of the Bear model
		user.username = req.body.username, user.password = req.body.password;
		// set the bears name (comes from the request)
		// save the bear and check for errors
		console.log(req.body.username);
		user.save(function (err) {
			if (err) {
				res.send(err);
			};
			res.json({
				message: user.username + ' with Pass ' + req.body.password + ' created!'
			});
		});
	})
	// more routes for our API will happen here
	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('API service started at Port : ' + port);