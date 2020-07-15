const User = require('../models/user');
const Message = require('../models/message');
const async = require('async');

const { body, validationResult } = require('express-validator/check');

// Handle message display on GET
exports.messages_display_get = function(req, res) {
    // Get all messages
    async.parallel({
        messages: function(callback) {
            Message.find().populate('author').exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('index', { title: 'Home', messages: results.messages });
    });
}

// Handle message create form on GET
exports.message_create_get = function(req, res) {
    if (typeof res.locals.currentUser === 'undefined') {
        res.redirect('/');
    }
    else {
        res.render('message-create-form', { title: 'Create Message'});
    }  
};

// Handle message create form on POST
exports.message_create_post = [
    // Validate fields
    body('title').trim().isLength({ min: 1 })
        .withMessage('Title must be specified.')
        .isLength({ max: 100 })
        .withMessage('Title cannot exceed 100 characters'),
    body('message').trim().isLength({ min: 1 })
        .withMessage('Message must not be empty.')
        .isLength({ max: 500 })
        .withMessage('Message cannot exceed 500 characters'),

     // Process request after validation and sanitization
     (req, res, next) => {
        // Not logged in, redirect to homepage
        if (typeof res.locals.currentUser === 'undefined') {
            return res.redirect('/');
        }

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Message object with escaped and trimmed data.
        var message = new Message({ 
            title: req.body.title,
            message: req.body.message,
            author: res.locals.currentUser._id,
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render('message-create-form', { title: 'Create Message', message: message, errors: errors.array() });
            return;
        }
        else {
            // Data is valid. Save Message.
            message.save(err => {
                if (err) {
                    return next(err);
                };
                res.redirect('/');
            });
        }
    }
];