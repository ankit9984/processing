import CollegeFee from "../models/collegeFee.model.js";
import CollegeStream from "../models/collegeStream.model.js";

const addFee = async (req, res) => {
    try {
        const {streamId} = req.params;
        const {tutionFees, termFees, otherFees, totalFees, annualFeesForIT} = req.body;

        const stream = await CollegeStream.findById(streamId);
        if(!stream){
            return res.status(400).json({error: 'Stream not found'})
        };

        const newfee = new CollegeFee({
            tutionFees,
            termFees,
            otherFees,
            totalFees,
            annualFeesForIT,
            stream: streamId
        });

        await newfee.save();
        
        stream.fee = newfee._id;
        await stream.save();
        
        res.status(200).json({message: 'Fee added successfully', newfee});
    } catch (error) {
        console.error('addFee controller', error);
        res.status(200).json({message: 'Server error'})
    }
};

export {
    addFee
}