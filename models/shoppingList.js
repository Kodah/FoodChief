var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('../models/Recipe');
var Recipe = mongoose.model('Recipe').schema;

var ShoppingListSchema = new Schema({

    recipes: [Recipe]
});


ShoppingListSchema.virtual('getIngredients').get(function() {
    var ingredientList = [];

    this.recipes.forEach(function(recipe) {
        console.log(recipe.name);
        recipe.ingredients.forEach(function(ingredient) {
            ingredient._id = undefined;
            ingredientList.push(ingredient);
        });
    });

    return ingredientList;
});

module.exports = mongoose.model('shoppingList', ShoppingListSchema);