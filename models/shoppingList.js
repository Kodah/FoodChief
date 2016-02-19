var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('../models/Recipe');
var Recipe = mongoose.model('Recipe').schema;

var shoppingListSchema = new Schema({

    recipes : [Recipe]
});

shoppingListSchema.virtual('shoppingList').get(function() {

	var shoppingList = [];

	this.recipes.forEach(function (recipe) {
		recipe.ingredients.forEach(function (ingredient) {
			shoppingList.push(ingredient);
		});
	});

    return shoppingList;
});

module.exports = mongoose.model('shoppingList', shoppingListSchema);