// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
// set up a mongoose model and pass it using module.exports
var UserSchema = new Schema({
    username: {
        type: String
            //        , required: true
            //        , index: {
            //            unique: true
            //        }
    }
    , password: {
        type: String
            //        , required: true
    }, // new properties
    //    loginAttempts: {
    //        type: Number
    //        , required: true
    //        , default: 0
    //    }
    //    , lockUntil: {
    //        type: Number
    //    }
});
UserSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // set the hashed password back on our user document
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function (candidatePassword, hashed, cb) {
    console.log(candidatePassword, hashed);
    bcrypt.compare(candidatePassword, hashed, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('User', UserSchema);