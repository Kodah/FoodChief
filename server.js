'use strict';

var express = require('express');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var app = express();

//Routes
var recipeRoute = require('./routes/recipe');

mongoose.connect('mongodb://localhost/DB_FoodChief');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

router.get('/', function(req, res, next) {
    res.json('Welcome to FoodChief :)');
});

app.use('/', router);
app.use('/recipe', recipeRoute);

app.listen(port);
