import mongoose from 'mongoose';

const collegeStreamSchema = new mongoose.Schema({
    streamName: {
        type: String,
        required: true
    },
    streamCode: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Self Finance', 'Un-Aided', 'Aided'],
        required: true
    },
    medium: {
        type: String,
        required: true
    },
    intake: {
        type: Number,
        required: true
    },
    minority: {
        type: String,
        required: true
    },
    isOfferingIT: {
        type: Boolean,
        required: true,
        default: false
    },
    fee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollegeFee'
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    }
}, {timestamps: true});

const CollegeStream = mongoose.model('CollegeStream', collegeStreamSchema);

export default CollegeStream;