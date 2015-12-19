var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
require('./Ingredient');
var Ingredient = mongoose.model('Ingredient').schema;

var IngredientListSchema = new Schema({
    serves: Number,
    ingredients: [Ingredient]
});

module.exports = mongoose.model('IngredientList', IngredientListSchema);
