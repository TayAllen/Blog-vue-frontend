/*jshint esnext: true, browser: true, node: true*/
var express = require("express"),
    app = express(),
    path = require("path"),
    port = process.env.PORT || 3000;

app.enable("etag", "strong");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//var sanitizer = require("sanitizer");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/vue-frontend-test6");

var compression = require("compression");
app.use(compression({threshold: false}));

app.use(express.static(path.join(__dirname, "../public")));
app.get("/", function(request, response) {
    response.send(path.join(__dirname, "index.html"));
});

var userCtrl = require("./ctrl/user-ctrl");
app.put("/accounts/registration", userCtrl.registerUser);
app.put("/accounts/login", userCtrl.userLogin);

app.listen(port, function() {
    console.log("Listening on port " + port);
});
