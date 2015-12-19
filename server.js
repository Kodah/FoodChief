'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/DB_FoodChief');

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/', router);

app.listen(port);
console.log('Magic happens on port ' + port);
