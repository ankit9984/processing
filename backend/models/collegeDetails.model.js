import mongoose from 'mongoose';

const collegeDetailsSchema = new mongoose.Schema({
    udiseNumber: {
        type: Number,
        required: true,
        unique: true
    },
    jrCollegeName: {
        type: String,
        required: true
    },
    popularName: {
        type: String,
        required: true
    },
    societyManagement: {
        type: String,
        required: true
    },
    typeOfManagement: {
        type: String,
        enum: ['Goverment', 'Private'],
        required: true
    },
    yearOfFoundation: {
        type: Number,
        required: true,
        min: 1800,
        max: new Date().getFullYear()
    },
    attachedTo: {
        type: String,
        requied: true
    },
    collegeType: {
        type: String,
        enum: ['Co-Ed', 'Girl', 'Boy'],
        required: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollegeAddress',
        default: null
    },
    streams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollegeStream'
    }]
}, {timestamps: true});



const College = mongoose.model('College', collegeDetailsSchema);

export default College;