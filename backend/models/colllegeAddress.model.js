import mongoose from 'mongoose';

const collegeAddressSchema = new mongoose.Schema({
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    },
    address: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zone: {
        type: String,
        required: true
    },
    region:{
        type: String,
        enum: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Amravati'],
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    nearestLandMark: {
        type: String,
        required: true
    },
    nearestBusStop: {
        type: String,
        required: true
    },
    nearestRailwayStation: {
        type: String,
        required: true
    },
    distanceOfStation: {
        type: String,
        required: true
    }
}, {timestamps: true});

const CollegeAddress = mongoose.model('CollegeAddress', collegeAddressSchema);

export default CollegeAddress;