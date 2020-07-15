const User = require('../models/user');
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator/check');

// Handle user create form on GET
exports.user_create_get = function(req, res) {
    if (typeof req.user !== "undefined") {
        res.redirect('/');
    }
    else {
        res.render('sign-up-form', { title: 'Sign-Up'});
    }
  };

// Handle user create form on POST
exports.user_create_post = [
    // Validate fields
    body('first_name').trim().isLength({ min: 1 })
        .withMessage('First name must be specified.')
        .isAlphanumeric()
        .withMessage('First name has non-alphanumeric characters.'),
    body('last_name').trim().isLength({ min: 1 })
        .withMessage('Last name must be specified.')
        .isAlphanumeric()
        .withMessage('Last name has non-alphanumeric characters.'),
    body('username').trim().isLength({ min: 1 })
        .withMessage('Username must be specified.')
        .isAlphanumeric()
        .withMessage('Username has non-alphanumeric characters.'),
    body('password').trim().isLength({ min: 8 })
        .withMessage('Password must be at least 8 chars long'),
    body('password_confirm', 'Password confirmation field must have the same value as the password field')
        .exists()
        .custom((value, { req }) => value === req.body.password),

    
    
    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render('sign-up-form', { title: 'Sign-Up', user: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data is valid

            // Hash password and save user object
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                const user = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    password: hashedPassword,
                    status: "Non-Member"
                }).save(err => {
                    if (err) {
                        return next(err);
                    };
                    res.redirect('/login');
                });
            });
        }
    }
]
