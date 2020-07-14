const User = require('../models/user');
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator/check');
const { locals } = require('../app');

// Handle join club form on GET
exports.join_club_get = function(req, res) {
    if (typeof req.user !== "undefined" && req.user.status !== "Member") {
        res.render('join-club-form', { title: 'Join Club' });
    }
    else {
        res.redirect("/");
    }
  };


// Handle join club form on POST
exports.join_club_post = [
    // Validate fields
    body('secret_code', 'The secret code is incorrect.')
        .exists()
        .custom((value, { req }) => {
            return bcrypt.compare(req.body.secret_code, process.env.SECRET_CODE_HASH);
        }
    ),

    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        console.log(errors);

        if (!errors.isEmpty()) {
            // There are errors. Render form again.
            res.render('join-club-form', { title: 'Join Club', 
                errors: errors.array() });
        }
        else {
            User.findOneAndUpdate({ _id: res.locals.currentUser._id }, { status: 'Member'},
                (err, doc) => {
                    if (err) {
                        return next(err);
                    }

                    res.redirect('/');
                });
        }
    }
];
