/*jshint esnext: true, browser: true, node: true*/
var mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    allow_comments: Boolean,
    comments: [{
        author: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    }],
    private: Boolean
},{collection: "blog"});

exports.Blog = mongoose.model("Blog", BlogSchema);
