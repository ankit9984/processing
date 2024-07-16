import mongoose from 'mongoose';

const collegeStreamSchema = new mongoose.Schema({
    streamName: {
        type: String,
        enum: ['Arts', 'Commerce', 'Science', 'HSVC'],
        required: true
    },
    streamCode: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Self Finance', 'Un-Aided', 'Aided', 'B.M.C'],
        required: true
    },
    medium: {
        type: String,
        enum: ['English', 'Hindi', 'Gujarati', 'Kannad', 'Marathi', 'Sindhi', 'Urdu'],
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
    optionalSubject: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OptionalSubject'
    }],
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    }
}, {timestamps: true});

const CollegeStream = mongoose.model('CollegeStream', collegeStreamSchema);

export default CollegeStream;