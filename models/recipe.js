var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./ingredient');
require('./instructions');
require('./comment');
var Ingredient = mongoose.model('Ingredient').schema;
var Instructions = mongoose.model('Instructions').schema;
var Comment = mongoose.model('Comment').schema;

var RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    _id: String,
    serves: Number,
    ingredients: [Ingredient],
    instructions: Instructions,
    date : Date,
    comments : [Comment],
    tags: [String],
    user: {
        type: String,
        required: true
    },
    image: String
});

RecipeSchema.path('name').set(function (_name){
    this._id = _name.replace(/\s+/g, '-').toLowerCase();
    //  + Math.floor(new Date() / 1000)
    return _name;
});

module.exports = mongoose.model('Recipe', RecipeSchema);
