import OptionalSubject from "../models/collegeOptionalSubject.model.js";
import CollegeStream from "../models/collegeStream.model.js";

const addSubject = async (req, res) => {
    try {
        const {streamId} = req.params;
        const {subject, intake} = req.body;

        if(!subject || !intake){
            return res.status(400).json({error: 'All fields required'})
        }
        
        const stream = await CollegeStream.findById(streamId);
        if(!stream){
            return res.status(400).json({error: 'Stream not found'})
        };

        const newSubject = new OptionalSubject({
            subject,
            intake,
            stream: streamId
        });

        await newSubject.save();

        stream.optionalSubject.push(newSubject._id);
        await stream.save();

        res.status(200).json({message: 'OptionalSubject added successfully', newSubject})
    } catch (error) {
        console.error('addSubject controller', error);
        res.status(500).json({message: 'Server error'})
    }
};

const updateSubject = async (req, res) => {
    try {
        const {subjectId} = req.params;
        const {subject, intake} = req.body;

        const optionalSubject = await OptionalSubject.findById(subjectId);
        if(!optionalSubject){
            return res.status(400).json({error: 'Stream is not found'})
        };
        
        optionalSubject.subject = subject || optionalSubject.subject;
        optionalSubject.intake = intake || optionalSubject.intake;

        await optionalSubject.save();
        res.status(200).json({message: 'Subject updated successfully', optionalSubject})
    } catch (error) {
        console.error('updateSubject controller', error);
        res.status(500).json({error: 'Server error'})
    }
}

const getSubject = async (req, res) => {
    try {
        const {subjectId} = req.params;

        const subject = await OptionalSubject.findById(subjectId);
        if(!subject){
            return res.status(400).json({error: 'Subject not found'})
        };

        res.status(200).json({message: 'Subject retrieve successfully', subject})
    } catch (error) {
        console.error('getSubject controller', error);
        res.status(500).json({message: 'Server error'})
    }
}



export {
    addSubject,
    updateSubject,
    getSubject,
}