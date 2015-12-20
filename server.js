'use strict';

var express = require('express');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var app = express();

require('./models/IngredientList');

var IngredientList = mongoose.model('IngredientList');
var Ingredient = mongoose.model('Ingredient');
var Instructions = mongoose.model('Instructions');

mongoose.connect('mongodb://localhost/DB_FoodChief');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });

    var ingredient1 = new Ingredient({
        name: "milk",
        quantity: "500 ml"
    });

    var ingredient2 = new Ingredient({
        name: "Krave",
        quantity: "100g"

    });

    var instructions = new Instructions({
        preperationTime: 30,
        cookTime: 20,
        steps : ["Pour Krave into bowl", "Pour milk into bowl"]
    });

    var ingredientList = new IngredientList({
        serves: 10,
        ingredients: [ingredient1, ingredient2],
        instructions: instructions
    });

    console.log(ingredientList.instructions.readyIn);

    // ingredientList.save(function(dberror) {
    //     if (dberror) {
    //         throw dberror;
    //     } else {
    //         console.log("Saved to db ", ingredientList);
    //     }
    // });
});

app.use('/', router);

app.listen(port);
