'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Ingredient  = require('./models/ingredient.js');
var IngredientList = require('./models/ingredientList.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/DB_FoodChief');

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });

    var ingredient1 = new Ingredient({
        name: "Ajvar",
        quantity: "500 ml"
    });

    var ingredient2 = new Ingredient({
        name: "bread",
    });

    var ingredientList = new IngredientList({
        serves : 69,
        ingredients : [ingredient1, ingredient2]
    });

    console.log(ingredientList.ingredients);



    // ingredientList.save(function (dberror)
    // {
    //     if (dberror)
    //     {
    //         throw dberror;
    //     }
    //     else
    //     {
    //         console.log("Saved to db");
    //     }
    // });
});

app.use('/', router);

app.listen(port);
console.log('Magic happens on port ' + port);
