var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
    {
        title: {type: String, required: true, maxlength: 100},
        timestamp: {type: Date, required: true},
        message: {type: String, required: true, maxlength: 500},
        author: {type: Schema.Types.ObjectId, ref: 'User'}
       }
);

// Export model
module.exports = mongoose.model('Message', MessageSchema);