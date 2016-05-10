/*jshint esnext: true, browser: true, node: true*/
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: false
}, {
    collection: "users"
});


UserSchema.pre("save", function(done) {
    var user = this;

    bcrypt.genSalt(8, function(error, salt) {
        if(error)
            return error;

        bcrypt.hash(user.password, salt, function(error, hash) {
            if(error)
                return error;
            user.password = hash;
            done();
        });
    });
});

UserSchema.methods.validatePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(error, pwMatch) {
        if(error)
            return error;
        return done(null, pwMatch);
    });
};


exports.User = mongoose.model("User", UserSchema);
