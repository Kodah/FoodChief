var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var CONFIG = require('../config/conf.js');

//Models
var User = mongoose.model('User');
var ShoppingList = mongoose.model('shoppingList');
var Recipe = mongoose.model('Recipe');

router.put('/:recipeID', function(req, res) {

    console.log("nigga");
    var username = CONFIG.getUserToken(req.get("authorization"));
    Recipe.findOne({
        _id: req.params.recipeID
    }).exec(function(err, recipe) {
        if (err) {
            console.log(err.message);
            res.json(err.message);
        } else {
            User.update({
                username: req.user.username
            }, {
                $push: {
                    "shoppingList.recipes": recipe
                }
            }, function(err) {
                if (err) {
                    res.json(err.message);
                } else {
                    res.json("success");
                };
            });
        }
    });
});

router.get('/', function(req, res) {
    console.log("fuck");
    var username = CONFIG.getUserToken(req.get("authorization"));
    User.findOne({
        username: username
    }).exec(function(err, user) {
        if (err) {

            res.json(err.message);
        } else {
            res.json(user.shoppingList.getIngredients);
        }

    });
});

router.delete('/:recipeID', function(req, res) {
    var username = CONFIG.getUserToken(req.get("authorization"));

    User.find({
        username: req.user.username
    }, function(err, user) {
        if (err) {
            res.json(err.message);
        } else {
            console.log(user);
            var shoppingList = user.shoppingList;
            for (var i = 0; i < shoppingList.recipes.length; i++) {

                if (recipes[i]._id === req.params.recipeID) {
                    user.shoppingList.recipes.splice(i, i+1);
                };
            };
            res.json("success");
        };
    });
});

module.exports = router;