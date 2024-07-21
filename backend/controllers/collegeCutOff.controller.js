import CutOff from "../models/collegeCutOff.Model.js";
import CollegeStream from "../models/collegeStream.model.js";

const registerCutOff = async (req, res) => {
    try {
        const { streamId } = req.params;
        const { category, SC, ST, VJA, NTB, NTC, NTD, OBC, SBC, SEBC, EWS, General } = req.body;

        const stream = await CollegeStream.findById(streamId);
        if (!stream) {
            return res.status(400).json({ error: 'Stream is not found' })
        };

        // Check if a cutoff for the given stream and category already exists
        const existingCutOff = await CutOff.findOne({ stream: streamId, category });
        if (existingCutOff) {
            return res.status(400).json({ error: 'Cutoff for this category and stream already exists' });
        }

        const newCutOff = new CutOff({
            category,
            SC,
            ST,
            VJA,
            NTB,
            NTC,
            NTD,
            OBC,
            SBC,
            SEBC,
            EWS,
            General,
            stream: streamId
        });

        await newCutOff.save();

        //Push cutoffid in stream
        stream.cutOff.push(newCutOff._id);
        await stream.save();

        res.status(200).json({ message: 'RegisterCutOff succussfully', newCutOff });
    } catch (error) {
        console.error('RegisterCutOff controller', error);
        res.status(500).json({ message: error.message })
    }
};

const updateCutOff = async (req, res) => {
    try {
        const {cutOffId} = req.params;
        const { category, SC, ST, VJA, NTB, NTC, NTD, OBC, SBC, SEBC, EWS, General } = req.body;

        const existingCutOff = await CutOff.findById(cutOffId);
        if(!existingCutOff){
            return res.status(404).json({error: 'Cut-Off not found'})
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
        const {cutOffId} = req.params;

        const cutOff = await CutOff.findById(cutOffId);
        if(!cutOff){
            return res.status(400).json({error: 'CutOff  not found'})
        };
        
        res.status(200).json({message: "CutOff retrieve successfully", cutOff})
    } catch (error) {
        console.error('getCutOff controller', error);
        res.status(500).json({message: error.message})
    }
}

export {
    registerCutOff,
    updateCutOff,
    getCutOff
}