import mongoose from 'mongoose';

const bifocalSubjectSchema = new mongoose.Schema({
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
        enum: ['Self-Finance', 'Un-Aided', 'Aided', 'B.M.C'],
        required: true
    },
    fee: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const BifocalSubject = mongoose.model('BifocalSubject', bifocalSubjectSchema);

export default BifocalSubject;