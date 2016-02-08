var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

//Models
require('../models/User');
require('../models/Recipe');
var Recipe = mongoose.model('Recipe');
var User = mongoose.model('User');
var Ingredient = mongoose.model('Ingredient');
var Instructions = mongoose.model('Instructions');

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

//Update recipe
router.put('/:recipeID', function(req, res) {
    Recipe.findByIdAndUpdate(id, {
        $set: {
            size: 'large'
        }
    }, function(err, tank) {
        if (err) return handleError(err);
        res.send(tank);
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

// router.get('/', function(req, res) {
//     res.json({
//         message: 'hooray! welcome to our api!'
//     });
//
//     var ingredient1 = new Ingredient({
//         name: "milk",
//         quantity: "500 ml"
//     });
//
//     var ingredient2 = new Ingredient({
//         name: "Krave",
//         quantity: "100g"
//
//     });
//
//     var instructions = new Instructions({
//         preperationTime: 30,
//         cookTime: 20,
//         steps: ["Pour Krave into bowl", "Pour milk into bowl"]
//     });
//
//     var recipe = new Recipe({
//         name: "bowl of krave",
//         serves: 10,
//         ingredients: [ingredient1, ingredient2],
//         instructions: instructions
//     });
//
//     console.log(recipe.instructions.readyIn);
//
//     recipe.save(function(dberror) {
//         if (dberror) {
//             throw dberror;
//         } else {
//             console.log("Saved to db ", recipe);
//         }
//     });
// });

module.exports = router;