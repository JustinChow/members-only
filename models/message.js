const moment = require('moment')
const mongoose = require('mongoose');

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

// Virtual for formatted createdAt timestamp
MessageSchema.virtual('createdAtFormatted').get(function() {
    return moment(this.createdAt).format('llll');
})

// Export model
module.exports = mongoose.model('Message', MessageSchema);