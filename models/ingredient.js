var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var IngredientSchema   = new Schema({
    name: { type: String, required: false },
    quantity: { type: String, required: false },
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
