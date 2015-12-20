var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./ingredient');
require('./instructions');
var Ingredient = mongoose.model('Ingredient').schema;
var Instructions = mongoose.model('Instructions').schema;

var IngredientListSchema = new Schema({
    serves: Number,
    ingredients: [Ingredient],
    instructions: Instructions,
    tags: [String]
});

module.exports = mongoose.model('IngredientList', IngredientListSchema);
