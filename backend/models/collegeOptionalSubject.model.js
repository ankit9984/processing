import mongoose from "mongoose";

const optionalSubjectSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    intake: {
        type: Number,
        required: true
    },
    stream: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollegeStream'
    }
},{timestamps: true});

const OptionalSubject = mongoose.model('OptionalSubject', optionalSubjectSchema);

export default OptionalSubject;