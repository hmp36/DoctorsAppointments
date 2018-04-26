'use strict';
const mongoose = require('mongoose');

const BucketlistSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Title is required."],

    },
    description: {
        type: String,
        required: [true, "Desription is required."],
        minlength: 10,
    },
    name: {
        type: String,
        required: [true, "User adding bucketlist item is required."]
    },

}, {
    timestamps: true
});

const Bucketlist = mongoose.model('Bucketlist', BucketlistSchema)