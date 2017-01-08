// =======================
// get the packages we need ============
// =======================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config/config'); // get our config file
var User = require('./auth/auth'); // get our mongoose model
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.Promise = global.Promise;
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    extended: false
}));
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));
// =======================
// routes ================
// =======================
// basic route
app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});
// get an instance of the router for api routes
var apiRoutes = express.Router();
// API ROUTES -------------------
app.post('/register', function (req, res) {
    // create a sample user
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    // save the sample user
    user.save(function (err) {
        res.json({
            success: true
            , pass: user.password
            , user: user.username
        });
    });
});
// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
// TODO: route middleware to verify a token
// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function (req, res) {
    res.json({
        message: 'Welcome to the coolest API on earth!'
    });
});
// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
app.post('/authenticate', function (req, res) {
    // find the user
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({
                success: false
                , message: 'Authentication failed. User not found.'
            });
        }
        else if (user) {
            // check if password matches
            //            var userStatus = null;
            user.comparePassword(req.body.password, user.password, function (err, isMatch) {
                if (err) throw err;
                //                console.log('Passwor match:', isMatch); // -&gt; Password123: true
                if (!isMatch) {
                    res.json({
                        success: false
                        , message: 'Authentication failed. Wrong password.'
                        , pass: user.password
                    });
                }
                else {
                    // if user is found and password is right
                    // create a token
                    // test a matching password
                    var token = jwt.sign(user, app.get('superSecret'), {
                        expiresIn: 1440 // expires in 24 hours
                    });
                    // return the information including token as JSON
                    res.json({
                        success: true
                        , message: 'Enjoy your token!'
                        , token: token
                    });
                }
            });
        }
    });
});
// route middleware to verify a token
app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({
                    success: false
                    , message: 'Failed to authenticate token.'
                });
            }
            else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        // if there is no token
        //        sdf
        // return an error
        return res.status(403).send({
            success: false
            , message: 'No token provided.'
        });
    }
});
// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);