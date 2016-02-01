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

router.post('/', function(req, res, next) {
    
    var user = new User();
    username = req.body.username;
    password = req.body.password;

    User.getAuthenticated(username, password, function(err, user, reason) {
        if (!err) {
            res.send("Login successful").status(200);
        }
        else
        {
            res.status(reason).send(err); 
        }

        });
});
 



module.exports = router;
