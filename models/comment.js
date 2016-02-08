var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User').schema;

var CommentSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false,
        max: 100,
        min: 0
    }

});

module.exports = mongoose.model('Comment', CommentSchema);
