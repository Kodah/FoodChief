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

    var username = CONFIG.getUserToken(req.get("authorization"));

    Recipe.find({
        _id: req.params.recipeID
    }).exec(function(err, recipe) {
        console.log(recipe);
        if (recipe) {
            User.update({
                username: req.user.username
            }, {
                $push: {
                    "shoppingList.recipeIds": req.params.recipeID
                }
            }, function(err) {
                if (err) {
                    res.json(err.message);
                } else {
                    res.json("success");
                };
            });
        } else {
            res.json("recipe not found");
        };
    });
});

router.get('/', function(req, res) {
    var username = CONFIG.getUserToken(req.get("authorization"));
    User.findOne({
        username: username
    }).exec(function(err, user) {
        if (err) {

            res.json(err.message);
        } else {

            var callback = function(result) {
                res.json(result);
            }
            user.shoppingList.set('getIngredients', callback);

        }

    });
});


router.delete('/:recipeID', function(req, res) {

    var username = CONFIG.getUserToken(req.get("authorization"));

    Recipe.find({
        _id: req.params.recipeID
    }).exec(function(err, recipe) {
        console.log(recipe);
        if (recipe) {
            User.update({
                username: req.user.username
            }, {
                $pull: {
                    "shoppingList.recipeIds": req.params.recipeID
                }
            }, function(err) {
                if (err) {
                    res.json(err.message);
                } else {
                    res.json("success");
                };
            });
        } else {
            res.json("recipe not found");
        };
    });
});
module.exports = router;