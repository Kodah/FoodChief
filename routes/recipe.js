var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

//Models
require('../models/Recipe');
var Recipe = mongoose.model('Recipe');
var Ingredient = mongoose.model('Ingredient');
var Instructions = mongoose.model('Instructions');


router.get('/', function(req, res, next) {
    res.json('Recipe API');
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
