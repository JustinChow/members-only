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


// Virtual for full name
UserSchema.virtual('fullName').get(function() {
    return this.first_name + ' ' + this.last_name;
})

// Export model
module.exports = mongoose.model('User', UserSchema);