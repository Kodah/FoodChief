var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Ingredient = require('./ingredient.js');

var IngredientListSchema = new Schema({
    serves: Number,
    ingredients: [Ingredient]
});

module.exports = mongoose.model('IngredientList', IngredientListSchema);
