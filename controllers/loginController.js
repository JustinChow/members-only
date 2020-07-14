const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { body, validationResult } = require('express-validator/check');

// Handle login form on GET
exports.login_get = function(req, res) {
    res.render('login-form', { title: 'Login' });
};

// Handle login form on POST
exports.login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
});

