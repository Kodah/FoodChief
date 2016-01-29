var expect = require("chai").expect;
var Instructions = require("../models/instructions");
var mongoose = require('mongoose');
require('../models/ingredient');
require('../models/instructions');
require('../models/recipe');
require('../models/user');

describe("Instructions", function() {
    beforeEach(function(done) {
        var instructions = new Instructions();
        instructions.preperationTime = 10;
        instructions.cookTime = 45;

        instructions.save(function(err) {
            done();
        });
    });
    afterEach(function(done) {
        Instructions.remove({}, function() {
            done();
        });
    });

    it("Virtual parameter 'readyIn' is correctly computed from prep and cook time", function() {
        Instructions.findOne({}, function(err, doc) {
            expect(doc).to.not.be.null;
            expect(doc.readyIn).to.be.equal(55);
        });
    });
});
