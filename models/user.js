var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        first_name: {type: String, required: true, maxlength: 100},
        last_name: {type: String, required: true, maxlength: 100},
        username: {type: String, required: true, maxlength: 32},
        password: {type: String, required: true},
        status: {type: String, required: true, enum: ["Non-Member", "Member", "Admin"]}
    }
);

// Export model
module.exports = mongoose.model('User', UserSchema);