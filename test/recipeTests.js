var mongoose = require('mongoose');
var expect = require("chai").expect;
var Recipe = require("../models/recipe");

describe("Recipes", function() {
    RECIPE_NAME = "Peanut butter jelly sandwich";
    EXPECTED_ID = "peanut-butter-jelly-sandwich"
    beforeEach(function(done) {
        var recipe = new Recipe();
        recipe.name = RECIPE_NAME;
        recipe.save(function(err) {
            done();
        });
    });
    afterEach(function(done) {
        Recipe.remove({}, function() {
            done();
        });
    });

    it("Assigns a custom _Id based on the username on saving of new Recipe", function() {
        Recipe.findOne({
            name: RECIPE_NAME
        }, function(err, doc) {
            expect(doc).to.not.be.null;
            expect(doc._id).to.be.equal(EXPECTED_ID);
        });
    });
});
