// Import necessary modules (assuming these are defined elsewhere)
const mongoose = require('mongoose');
const College = require('./models/College');
const CollegeStream = require('./models/CollegeStream');
const Cutoff = require('./models/Cutoff');

// Define the main function
const getCutOffBasedOnCollegeId = async (req, res) => {
    // Extract collegeId from the request parameters
    const { collegeId } = req.params;

    try {
        // Step 1: Find the college
        const college = await College.findById(collegeId);

        // Step 2: Check if the college was found
        if (!college) {
            return res.status(404).json({ error: 'College not found' });
        }

        // Step 3: Get the streams for this college
        const streams = await CollegeStream.find({ _id: { $in: college.streams } });

        // Step 4: Get cutoffs for each stream
        const streamsWithCutoffs = await Promise.all(streams.map(async (stream) => {
            const cutoff = await Cutoff.findById(stream.cutOff);
            
            // Filter and transform cutoff data
            const filteredCutoffs = cutoff.cutOffs
                .filter(c => c.category === 'Pure')
                .map(c => ({
                    category: c.category,
                    data: { General: c.data.General }
                }));

            return {
                _id: stream._id,
                streamName: stream.streamName,
                streamCode: stream.streamCode,
                status: stream.status,
                cutOff: {
                    year: cutoff.year,
                    cutOffs: filteredCutoffs
                }
            };
        }));

        // Step 5: Prepare the response
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
        // Step 7: Handle any errors
        console.error('Error in getCutOffBasedOnCollegeId', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Export the function so it can be used in other files
module.exports = getCutOffBasedOnCollegeId;