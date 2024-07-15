import mongoose from "mongoose";

const collegeFeeSchema = new mongoose.Schema({
    tutionFees: {
        type: Number,
        required: true
    },
    termFees: {
        type: Number,
        required: true
    },
    otherFees: {
        type: Number,
        required: true
    },
    totalFees: {
        type: Number,
        required: true
    },
    annualFeesForIT: {
        type: Number,
        required: true,
        default: 0
    },
    stream: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollegeStream'
    }
}, {timestamps: true});

const CollegeFee = mongoose.model('CollegeFee', collegeFeeSchema);

export default CollegeFee;