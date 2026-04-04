const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a hostel name'],
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
    },
    capacity: {
        type: Number,
        required: [true, 'Please add capacity'],
    },
    wardenName: {
        type: String,
        required: [true, 'Please add warden name'],
    },
    contactNumber: {
        type: String,
        required: [true, 'Please add contact number'],
    },
    price: {
        type: String,
        default: "Contact for pricing",
    },
    gender: {
        type: String,
        default: "All Genders",
    },
    image: {
        type: String,
        default: "https://via.placeholder.com/400x300",
    },
    tag: {
        type: String,
        default: "",
    },
    amenities: {
        type: [String],
        default: [],
    },
    warden: {
        type: mongoose.Schema.ObjectId,
        ref: 'Warden',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Hostel', hostelSchema);
