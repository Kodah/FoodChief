var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// require('../models/Recipe');
var Recipe = mongoose.model('Recipe');

var ShoppingListSchema = new Schema({

    recipeIds: []
});


function getIngredientData(recipeIds, callback) {

    Recipe.find({
        _id: {
            $in: recipeIds
        }
    }, {
        _id: 0
    }).exec(function(err, recipes) {
        var counter = [];
        var ingredientList = [];


        console.log(recipes.length);

        recipes.forEach(function(recipe) {

            recipe.ingredients.forEach(function(ingredient) {

                ingredientList.push(ingredient);
            });

            counter.push(true);

        });
        if (counter.length == recipes.length) {
            callback(ingredientList);

        };

    });
}

ShoppingListSchema.virtual('getIngredients').set(function(callback) {
    getIngredientData(this.recipeIds, callback);
});



module.exports = mongoose.model('shoppingList', ShoppingListSchema);