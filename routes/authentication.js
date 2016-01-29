var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

//Models
require('../models/User');
var User = mongoose.model('User');


router.get('/', function(req, res, next) {
    res.json('Authentication Api');
});

router.post('/authenticate', function(req, res, next) {
    

});
 



module.exports = router;
