var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstructionsSchema = new Schema({
    preperationTime: Number,
    cookTime: Number,
    steps: [String],

}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

InstructionsSchema.virtual('readyIn').get(function() {
    return this.preperationTime + this.cookTime;
});

module.exports = mongoose.model('Instructions', InstructionsSchema);
