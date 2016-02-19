var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/conf.js');

//Models
require('../models/User');
var Recipe = mongoose.model('Recipe');
var User = mongoose.model('User');
var Ingredient = mongoose.model('Ingredient');
var Instructions = mongoose.model('Instructions');
var Comment = mongoose.model('Comment');
var ShoppingList = mongoose.model('shoppingList');

//Get all recipes
router.get('/', function(req, res, next) {
    Recipe.find({}).sort('date').exec(function(err, recipes) {
        res.json(recipes);
    });
});

//Post new recipe
router.post('/', function(req, res, next) {
    var recipe = new Recipe();
    recipe.name = req.body.name;
    recipe.serves = req.body.serves;
    recipe.tags = req.body.tags;
    recipe.date = Date.now();
    recipe.comments = [];
    recipe.user = getUsernameFromToken(req.get("authorization"));
    recipe.image = req.body.image;
    req.body.ingredients.forEach(function(_ingredient) {
        var ingredient = new Ingredient({
            name: _ingredient.name,
        });
        if (_ingredient.quantity !== undefined) {
            ingredient.quantity = _ingredient.quantity
        }
        recipe.ingredients.push(ingredient);
    });

    var instructions = new Instructions({
        preperationTime: req.body.instructions.preperationTime,
        cookTime: req.body.instructions.cookTime,
        steps: req.body.instructions.steps
    });

    recipe.instructions = instructions;


    recipe.save(function(err) {
        if (err) {
            throw err
        };

        User.update({
            username: req.user.username
        }, {
            $push: {
                postedRecipes: recipe._id
            }
        }, function(err) {
            if (err) {
                res.status(500).send(err)
            };
            res.status(200).send('saved');
        });
    });
});

//Get recipe by ID
router.get('/:recipeID', function(req, res, next) {
    Recipe.find({
        _id: req.params.recipeID
    }).exec(function(err, recipe) {
        if (err) throw err;

        res.json(recipe);
    });
});

//Get recipe by searching name, ingredients and tag
router.get('/find/:query?/', function(req, res, next) {
    var regex = new RegExp(req.params.query, 'i');
    var queryConditions = [{
        $or: [{
            'name': regex
        }, {
            'ingredients.name': regex
        }]
    }];

    if (typeof req.query.tags != "undefined") {
        var tags = [];
        tags = req.query.tags.split(',');
        queryConditions.add({
            'tags': {
                $in: tags
            }
        });
    };


    Recipe.find({
        $and: queryConditions
    }).exec(function(err, docs) {
        if (err) throw err;

        res.json(docs);
    });
});

router.post('/comment/:recipeID', function(req, res, next) {
    var username = getUsernameFromToken(req.get("authorization"));

    var comment = new Comment();
    comment.date = Date.now();
    comment.body = req.body.commentBody;
    comment.rating = req.body.rating;
    comment.user = username;

    var conditions = {
            _id: req.params.recipeID
        },
        update = {
            $push: {
                comments: comment
            }
        },
        options = {
            multi: false
        };

    Recipe.findOneAndUpdate(conditions, update, options, callback);

    function callback(err, numAffected) {
        if (err) {
            res.json(err)
        } else if (numAffected == null) {
            res.json("Recipe doesnt exist");
        } else {
            res.json("Success");
        };
    };
});

//Update recipe
router.put('/:recipeID', function(req, res) {
    var username = getUsernameFromToken(req.get("authorization"));

    var ingredients = [];

    req.body.ingredients.forEach(function(_ingredient) {
        var ingredient = new Ingredient({
            name: _ingredient.name,
        });
        if (_ingredient.quantity !== undefined) {
            ingredient.quantity = _ingredient.quantity
        }
        ingredients.push(ingredient);
    });

    var conditions = {
            _id: req.params.recipeID,
            user: username
        },
        update = {
            "serves": req.body.serves,
            "$set": {
                "instructions.preperationTime": req.body.instructions.preperationTime
            },
            "$set": {
                "instructions.cookTime": req.body.instructions.cookTime
            },
            "$set": {
                "instructions.steps": req.body.instructions.steps
            },
            "$set": {
                "tags": req.body.tags
            },
            "$set": {
                "ingredients": ingredients
            }
        },
        z
    options = {
        multi: false
    };

    Recipe.findOneAndUpdate(conditions, update, options, callback);

    function callback(err, numAffected) {
        if (err) {
            res.json(err)
        } else if (numAffected == null) {
            res.json("Recipe doesnt exist");
        } else {
            res.json("Success");
        };
    };

});


router.put('/shoppinglist/:recipeID', function(req, res) {
    var username = getUsernameFromToken(req.get("authorization"));
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





router.delete('/:recipeID', function(req, res) {
    Recipe.remove({
        _id: req.params.recipeID
    }).exec(function(err, recipe) {
        if (err) {
            throw err;
        } else {
            res.json({
                "deleted": req.params.recipeID
            });
        }
    });
});

//helper functions
function getUsernameFromToken(token) {
    var decoded = jwt.verify(token.split(" ")[1], config.JWTSECRET);
    return decoded.username;
}


module.exports = router;