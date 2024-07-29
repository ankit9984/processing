import College from "../models/collegeDetails.model.js";
import CollegeStream from "../models/collegeStream.model.js";

// ... other functions ...

const getStreamInfoByCollegeId = async (req, res) => {
    try {
        const { collegeId } = req.params;
        const college = await College.findById(collegeId).populate({
            path: 'streams',
            populate: {
                path: 'fee',
                model: 'CollegeFee'
            }
        });

        if (!college) {
            return res.status(400).json({ message: 'College not found' });
        }

        const streams = college.streams.map(stream => ({
            streamId: stream._id,
            streamName: stream.streamName,
            streamCode: stream.streamCode,
            streamStatus: stream.status,
            streamIT: stream.isOfferingIT,
            streamMedium: stream.medium,
            streamIntake: stream.intake,
            totalFees: stream.fee ? stream.fee.totalFees : null,
            annualFeesForIT: stream.fee ? stream.fee.annualFeesForIT : null
        }));

        console.log(streams);

        res.status(200).json({ message: 'CollegeStream details get successfully', streams });
    } catch (error) {
        console.error('getStreamInfoByCollegeId controller', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export {
    registerStream,
    updateStream,
    getStream,
    getStreamInfoByCollegeId
}