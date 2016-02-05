var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/conf.js');

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
            var token = jwt.sign({
                username : username}, 
                config.JWTSECRET, 
                {expiresIn: 60 * 60}
            );
            res.json(token).status(200);
        }
        else
        {
            res.status(reason).send(err); 
        }

        });
});
 



module.exports = router;
