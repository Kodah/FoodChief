'use strict';

var express = require('express');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var app = express();
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var config = require('./config/conf.js');


//Routes
var recipeRoute = require('./routes/recipe');
var registrationRoute = require('./routes/registration');
var authenticationRoute = require('./routes/authentication');
var shoppinglistRoute = require('./routes/shoppinglist');

mongoose.connect('mongodb://localhost/DB_FoodChief');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(expressJWT({secret: config.JWTSECRET}).unless(config.filterRoutes));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

router.get('/', function(req, res, next) {
    res.json('Welcome to FoodChief :)');
});

app.use('/', router);
app.use('/recipes', recipeRoute);
app.use('/register', registrationRoute);
app.use('/authentication', authenticationRoute);
app.use('/shoppinglist', shoppinglistRoute);

app.listen(port);
