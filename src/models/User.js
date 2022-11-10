const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const md5 = require('md5');

const errorMessageObligatory = 'Obligatory field!';
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, errorMessageObligatory]
    },
    email: {
        type: String,
        required: [true, errorMessageObligatory]
    },
    password: {
        type: String,
        required: [true, errorMessageObligatory]
    }
});

// defines an event that executes before the user is saved on the db
UserSchema.pre('save', function (next) {
    // criptographs the password
    this.password = md5(this.password);
    next();
});

// makes the link of the schema with the collection
const User = mongoose.model('users', UserSchema);
module.exports = User;