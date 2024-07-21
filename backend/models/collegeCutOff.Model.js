import mongoose from 'mongoose';

const cutOffSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: [
            'Orphan', 'PH', 'Project / Earthquake affected', 'Pure', 'Technical (For Bifocal & HCVC Only)',
            'Trf./Ex.Sr./Ser./Sports', 'Women'
        ]
    },
    SC: {
        type: Number,
        default: null
    },
    ST: {
        type: Number,
        default: null
    },
    VJA: {
        type: Number,
        default: null
    },
    NTB: {
        type: Number,
        default: null
    },
    NTC: {
        type: Number,
        default: null
    },
    NTD: {
        type: Number,
        default: null
    },
    OBC: {
        type: Number,
        default: null
    },
    SBC: {
        type: Number,
        default: null
    },
    SEBC: {
        type: Number,
        default: null
    },
    EWS: {
        type: Number,
        default: null
    },
    General: {
        type: Number,
        default: null
    },
    stream: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollegeStream',
        required: true
    }
});

const CutOff = mongoose.model('CutOff', cutOffSchema);

export default CutOff;