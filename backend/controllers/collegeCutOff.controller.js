import CutOff from "../models/collegeCutOff.Model.js";
import College from "../models/collegeDetails.model.js";
import CollegeStream from "../models/collegeStream.model.js";
import mongoose from "mongoose";

const registerCutOff = async (req, res) => {
    try {
        const { streamId } = req.params;
        const { year, roundNumber, cutOffs } = req.body;

        const stream = await CollegeStream.findById(streamId);
        if (!stream) {
            return res.status(404).json({ error: 'Stream not found' })
        };

        const newCutOff = new CutOff({
            year,
            roundNumber,
            stream: streamId,
            cutOffs// Initially empty
        });

        const saveCutOff = await newCutOff.save();
        stream.cutOff.push(newCutOff._id);
        await stream.save();

        res.status(201).json({ message: 'CutOff initialized successfully', cutOff: saveCutOff });
    } catch (error) {
        console.error('Error in registerCutOff', error);
        res.status(500).json({ message: 'Server error' })
    }
};

const updateCutOff = async (req, res) => {
    try {
        const { cutOffId } = req.params;
        const { category, SC, ST, VJA, NTB, NTC, NTD, OBC, SBC, SEBC, EWS, General } = req.body;

        const existingCutOff = await CutOff.findById(cutOffId);
        if (!existingCutOff) {
            return res.status(404).json({ error: 'Cut-Off not found' })
        };

        if (category && category !== existingCutOff.category) {
            const duplicateCutOff = await CutOff.findOne({
                stream: existingCutOff.stream,
                category: category,
                _id: { $ne: cutOffId } // Exclude the current cut-off from the search
            });

            console.log(duplicateCutOff);

            if (duplicateCutOff) {
                return res.status(400).json({ error: 'A cut-off for this category already exists in the stream' });
            }
        }

        const updatedCutOff = await CutOff.findByIdAndUpdate(
            cutOffId,
            {
                category: category || existingCutOff.category,
                SC: SC !== undefined ? SC : existingCutOff.SC,
                ST: ST !== undefined ? ST : existingCutOff.ST,
                VJA: VJA !== undefined ? VJA : existingCutOff.VJA,
                NTB: NTB !== undefined ? NTB : existingCutOff.NTB,
                NTC: NTC !== undefined ? NTC : existingCutOff.NTC,
                NTD: NTD !== undefined ? NTD : existingCutOff.NTD,
                OBC: OBC !== undefined ? OBC : existingCutOff.OBC,
                SBC: SBC !== undefined ? SBC : existingCutOff.SBC,
                SEBC: SEBC !== undefined ? SEBC : existingCutOff.SEBC,
                EWS: EWS !== undefined ? EWS : existingCutOff.EWS,
                General: General !== undefined ? General : existingCutOff.General
            },
            { new: true, runValidators: true }
        );

        if (!updatedCutOff) {
            return res.status(404).json({ error: 'Cut-off not found' });
        };

        res.status(200).json({ message: 'Cut-off updated successfully', updatedCutOff });
    } catch (error) {
        console.error('UpdateCutOff controller error:', error);
        res.status(500).json({ message: error.message });
    }
}

const getCutOff = async (req, res) => {
    try {
        const { cutOffId } = req.params;

        const cutOff = await CutOff.findById(cutOffId);
        if (!cutOff) {
            return res.status(400).json({ error: 'CutOff  not found' })
        };

        res.status(200).json({ message: "CutOff retrieve successfully", cutOff })
    } catch (error) {
        console.error('getCutOff controller', error);
        res.status(500).json({ message: error.message })
    }
}

// const getCutOffBasedOnCollegeId = async (req, res) => {
//     const { collegeId } = req.params;

//     const college = await College.findById(collegeId)
//         .select('streams')
//         .populate({
//             path: 'streams',
//             select: 'streamName streamCode status',
//             populate: {
//                 path: 'cutOff',
//                 select: 'year cutOffs',
//                 match: {
//                     'cutOffs.category': { $in: ['Pure', 'General'] }
//                 },
//                 options: {
//                     slice: { 'cutOffs': -1 } // Ensure only relevant categories are included
//                 }
//             }
//         })
//     if (!college) {
//         return res.status(404).json({ error: 'College not found' })
//     };

//     res.status(200).json({ message: 'Cutoff get successfully', college })
// }

// const getCutOffBasedOnCollegeId = async (req, res) => {
//     const { collegeId } = req.params;

//     try {
//         const college = await College.aggregate([
//             { $match: { _id: new mongoose.Types.ObjectId(collegeId) } },
//             {
//                 $lookup: {
//                     from: 'collegestreams',
//                     localField: 'streams',
//                     foreignField: '_id',
//                     as: 'streams'
//                 }
//             },
//             { $unwind: '$streams' },
//             {
//                 $lookup: {
//                     from: 'cutoffs',
//                     localField: 'streams.cutOff',
//                     foreignField: '_id',
//                     as: 'streams.cutOff'
//                 }
//             },
//             { $unwind: '$streams.cutOff' },
//             {
//                 $project: {
//                     _id: 1,
//                     'streams._id': 1,
//                     'streams.streamName': 1,
//                     'streams.streamCode': 1,
//                     'streams.status': 1,
//                     'streams.cutOff.year': 1,
//                     'streams.cutOff.cutOffs': {
//                         $filter: {
//                             input: '$streams.cutOff.cutOffs',
//                             as: 'cutOff',
//                             cond: { $eq: ['$$cutOff.category', 'Pure'] }
//                         }
//                     }
//                 }
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     'streams._id': 1,
//                     'streams.streamName': 1,
//                     'streams.streamCode': 1,
//                     'streams.status': 1,
//                     'streams.cutOff.year': 1,
//                     'streams.cutOff.cutOffs.category': 1,
//                     'streams.cutOff.cutOffs.data.General': 1
//                 }
//             },
//             {
//                 $group: {
//                     _id: '$_id',
//                     streams: { $push: '$streams' }
//                 }
//             }
//         ]);

//         if (!college || college.length === 0) {
//             return res.status(404).json({ error: 'College not found' });
//         }

//         res.status(200).json({ message: 'Cutoff retrieved successfully', college: college[0] });
//     } catch (error) {
//         console.error('Error in getCutOffBasedOnCollegeId', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

const getCutOffBasedOnCollegeId = async(req, res) => {
    const {collegeId} = req.params;

    try {
        const college = await College.findById(collegeId);
        if(!college){
            return res.status(404).json({error: 'College not found'})
        };

        const streams = await CollegeStream.find({_id: {$in: college.streams}})
        
        const streamsWithCutoffs = await Promise.all(streams.map(async (stream) => {
            const cutoff = await CutOff.findById(stream.cutOff);
            // console.log(cutoff);
            const filteredCutoffs = cutoff.cutOffs
                .filter(c => c.category === 'Pure')
                .map(c => ({
                    category: c.category,
                    data: {General: c.data.General}
                }));
            
            return {
                _id: stream._id,
                streamName: stream.streamName,
                streamCode: stream.streamCode,
                status: stream.status,
                // cutOff: {
                    year: cutoff.year,
                    cutOffs: filteredCutoffs
                // }
            }
        }));

        console.log(streamsWithCutoffs);
        

        const response = {
            _id: college._id,
            streams: streamsWithCutoffs
        };

        // Step 6: Send the successful response
        res.status(200).json({ 
            message: 'Cutoff retrieved successfully', 
            college: response 
        });

    } catch (error) {
        console.error('Error in getCutOffBasedOnCollegeId', error);
        res.status(500).json({ message: 'Server error' });
    }
}




export {
    registerCutOff,
    updateCutOff,
    getCutOff,
    getCutOffBasedOnCollegeId
}