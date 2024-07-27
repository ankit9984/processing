import College from "../models/collegeDetails.model.js";
import CollegeStream from "../models/collegeStream.model.js";

const registerStream = async (req, res) => {
    try {
        const {collegeId} = req.params;
        const {streamName, streamCode, status, medium, intake, minority, isOfferingIT} = req.body;

        const stream = await CollegeStream.findOne({streamCode});
        if(stream){
            return res.status(404).json({error: 'StreamCode is already taken'})
        };

        const college = await College.findById(collegeId);

        if(!college){
            return res.status(400).json({error: 'College not found'})
        }

        const newStream = new CollegeStream({
            streamName,
            streamCode,
            status,
            medium,
            intake,
            minority,
            isOfferingIT,
            college: collegeId
        });

        await newStream.save();
        college.streams.push(newStream._id);

        await college.save();

        res.status(200).json({message: 'registerStream added successfull', newStream});
    } catch (error) {
        console.log('registerStream controller', error);
        res.status(500).json({message: 'Server error'})
    }
};

const updateStream = async (req, res) => {
    try {
        const {collegeId} = req.params;
        const {streamId} = req.params;

        const {streamName, streamCode, status, medium, intake, minority, isOfferingIT} = req.body;

        const college = await College.findById(collegeId);
        if(!college){
            return res.status(400).json({message: 'College not found'})
        };

        const stream = await CollegeStream.findById(streamId);
        if(!stream){
            return res.status(400).json({message: 'Stream is not found'})
        };

        console.log(stream.streamCode);
        console.log(streamCode);

        if (streamCode && streamCode !== stream.streamCode) {
            // Check if the new streamCode already exists in the database
            const existingStream = await CollegeStream.findOne({ streamCode });
            console.log(existingStream);
            if (existingStream) {
                return res.status(400).json({ message: 'StreamCode is already taken' });
            }
            // If it's unique, update the streamCode
            stream.streamCode = streamCode;
        }

       stream.streamName = streamName || stream.streamName;
       stream.status = status || stream.status;
       stream.medium = medium || stream.medium;
       stream.intake = intake || stream.intake;
       stream.minority = minority || stream.minority;
       stream.isOfferingIT = isOfferingIT || stream.isOfferingIT;

       await stream.save();

       res.status(200).json({message: 'Stream update successfully', stream});
       
    } catch (error) {
        console.error('updateStream controller', error);
        res.status(500).json({message: 'Server error'})
    }
}

const getStream = async (req, res) => {
    try {
        const {streamId} = req.params;

        const stream = await CollegeStream.findById(streamId);
        if(!stream){
            return res.status(400).json({message: 'Stream is not found'})
        };

        res.status(200).json({message: 'Stream data received successfully', stream})
    } catch (error) {
        console.error('getStream controller', error);
        res.status(500).json({message: 'Server error'})
    }
}

const getStreamInfoByCollegeId = async (req, res) => {
    try {
        const {collegeId} = req.params;
        const college = await College.findById(collegeId).populate('streams')
        if(!college){
            return res.status(400).json({message: 'College not found'})
        };

        const streamDetails = college.streams.map(stream => ({
            streamId: stream._id,
            streamName: stream.streamName,
            streamCode: stream.streamCode,
            streamStatus: stream.status,
            streamIT: stream.isOfferingIT
        }))

        res.status(200).json({streamDetails})
    } catch (error) {
        console.error('getStreamInfoByCollegeId controller', error);
        res.status(500).json({message: 'Server error'})
    }
}

export {
    registerStream,
    updateStream,
    getStream,
    getStreamInfoByCollegeId
}