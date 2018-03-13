'use strict';
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "Date is required."],
        min: new Date(+Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    time: {
        type: Number,
        required: [true, "Time is required."],
        min: [480, "Too early"],
        max: [1020, "Too late"],
    },
    complaint: {
        type: String,
        required: [true, "Complaint is required."],
        minlength: 10,
    },
    _username: {
        type: String,
        required: [true, "User adding question is required."]
    },
    _userID: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', AppointmentSchema)