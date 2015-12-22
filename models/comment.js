var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./user');
var User = mongoose.model('User').schema;

var CommentSchema = new Schema({
    user: {
        type: User,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comment: {
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
