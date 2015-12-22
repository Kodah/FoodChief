var expect = require("chai").expect;
var User = require("../models/user");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/DB_FoodChief_tests');

describe("Users", function() {
    var currentUser = null;
    NOT_FOUND = 0;
    PASSWORD_INCORRECT = 1;
    MAX_ATTEMPTS = 2;
    beforeEach(function(done) {
        var user = new User();
        user.username = "Tom";
        user.password = "Password";
        user.save(function(err) {
            currentUser = user;
            done();
        });
    });
    afterEach(function(done) {
        User.remove({}, function() {
            done();
        });
    });

    it("authenticates and returns user with valid login", function(done) {
        User.getAuthenticated("Tom", "Password", function(err, user, reason) {
            if (err) throw err;
            expect(user).to.not.be.null;
            expect(user.username).to.be.equal("Tom");
            console.log(user.username);
            done();
        });
    });

    it("Does not authenticate with invalid password with correct reason", function(done) {
        User.getAuthenticated("Tom", "WrongPassword", function(err, user, reason) {
            if (err) throw err;
            expect(user).to.be.null;
            expect(reason).to.be.equal(PASSWORD_INCORRECT);
            done();
        });
    });

    it("Does not authenticate non-existant user", function(done) {
        User.getAuthenticated("I-Dont-Exist", "Password", function(err, user, reason) {
            if (err) throw err;
            expect(user).to.be.null;
            expect(reason).to.be.equal(NOT_FOUND);
            done();
        });
    });

    it("Does not authenticate user with exceeded max attempts, even with correct password", function(done) {


        var badAttempt = function(tryCount) {
            // console.log("bad attempt number: " + tryCount);
            User.getAuthenticated("Tom", "WrongPassword", function(err, user, reason) {
                if (err) throw err;

                if (tryCount == 6) {
                    User.getAuthenticated("Tom", "Password", function(err, user, reason) {
                        expect(reason).to.be.equal(MAX_ATTEMPTS);
                        done();
                    });
                } else {
                    badAttempt(tryCount + 1);
                }
            });
        };
        badAttempt(0);

    });
});
