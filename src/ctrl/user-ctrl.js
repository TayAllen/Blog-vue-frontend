/*jshint esnext: true, browser: true, node: true*/
var UserSchema = require("../models/user");

exports.registerUser = function (request, response, password) {
    var user = new UserSchema.User({
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    });

    user.save(function (error) {
        if (error)
            response.json({
                error: error
            });
        response.json({
            status: 201,
            message: "Thank you for signing up!",
            redirectTo: "/login"
        });
    });
};

exports.userLogin = function (request, response) {
    //
    UserSchema.User.findOne({
        username: request.body.username,
    },function (error, user, password) {
        if (error)
            return response.json({
                error: error
            });

        if (!user)
            return response.json({
                status: 401,
                message: "Your credentials are invalid.",
                redirectTo: "/login"
            });

        user.validatePassword(request.body.password,  function(error, pwMatch) {
            if(error)
                return error;
            if(!pwMatch)
                return response.json({
                    status: 401,
                    message: "Your credentials are invalid. PW",
                    redirectTo: "/login"
                });
            else response.json({
                user: user,
                status: 205,
                message: "Logged in",
                redirectTo: "/dashboard"
            });
        });
    });
};
