var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
    {
        title: {type: String, required: true, maxlength: 100},
        message: {type: String, required: true, maxlength: 500},
        author: {type: Schema.Types.ObjectId, ref: 'User'}
    },
    {
        timestamps: true
    }
);

// Export model
module.exports = mongoose.model('Message', MessageSchema);