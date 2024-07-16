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

        const calculateTotal = tutionFees + termFees + otherFees;
        if(calculateTotal !== totalFees){
            return res.status(400).json({error: 'The sum of tutionFees, termFees, and otherFees must equal totalFees'})
        }

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

const updateFee = async (req, res) => {
    try {
        const {feeId} = req.params;

        const{tutionFees, termFees, otherFees, totalFees, annualFeesForIT} = req.body;

        const fees = await CollegeFee.findById(feeId);
        if(!fees){
            return res.status(400).json({error: 'Fee not found'})
        };

        const calculateTotal = tutionFees + termFees + otherFees

        if(calculateTotal !== totalFees){
            return res.status(400).json({error: 'The sum of tutionFees, termFees, and otherFees must equal totalFees'})
        }

        fees.tutionFees = tutionFees || fees.tutionFees;
        fees.termFees = termFees || fees.termFees;
        fees.otherFees = otherFees || fees.otherFees;
        fees.totalFees = totalFees || fees.totalFees;
        fees.annualFeesForIT = annualFeesForIT || fees.annualFeesForIT;

        await fees.save();
        
        res.status(200).json({message: 'Fees updated successfully', fees})
    } catch (error) {
        console.error('updateFee successfully', error);
        res.status(500).json({message: 'Server error'})
    }
}

const getFee = async (req, res) => {
    try {
        const {feeId} = req.params

        const fees = await CollegeFee.findById(feeId);
        if(!fees){
            return res.status(400).json({error: 'Fees not found'})
        };

        res.status(200).json({message: 'Fess retrieve successfully', fees})
    } catch (error) {
        console.error('getFee controller', error);
        res.status(500).json({message: 'Server error'})
    }
}

export {
    addFee,
    updateFee,
    getFee
}