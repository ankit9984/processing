import College from "../models/collegeDetails.model.js";
import CollegeStream from "../models/collegeStream.model.js"; // Adjust path as necessary

const filterColleges = async (req, res) => {
    try {
        // Extract query parameters from the request
        const {
            region,
            zone,
            area,
            collegeType,
            streamName,
            status,
            medium,
            minority
        } = req.query;

        // Build the aggregation pipeline
        const pipeline = [
            {
                $lookup: {
                    from: 'collegestreams', // Collection name for CollegeStream model
                    localField: 'streams',
                    foreignField: '_id',
                    as: 'streams'
                }
            },
            {
                $unwind: '$streams'
            },
            {
                $match: {
                    ...(region ? { 'address.region': region } : {}),
                    ...(zone ? { 'address.zone': zone } : {}),
                    ...(area ? { 'address.area': area } : {}),
                    ...(collegeType ? { collegeType: collegeType } : {}),
                    ...(streamName ? { 'streams.streamName': streamName } : {}),
                    ...(status ? { 'streams.status': status } : {}),
                    ...(medium ? { 'streams.medium': medium } : {}),
                    ...(minority ? { 'streams.minority': minority } : {})
                }
            },
            {
                $group: {
                    _id: '$address.region', // Group by region
                    totalColleges: { $sum: 1 }, // Count number of colleges per region
                    colleges: { $push: { jrCollegeName: '$jrCollegeName', popularName: '$popularName', streams: '$streams' } } // Collect details
                }
            },
            {
                $project: {
                    _id: 0, // Exclude _id field
                    region: '$_id', // Rename _id to region
                    totalColleges: 1,
                    colleges: 1
                }
            }
        ];

        // Execute the aggregation query
        const colleges = await College.aggregate(pipeline);

        // Return the results
        res.status(200).json(colleges);
    } catch (error) {
        console.error('filterColleges controller', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export {
    filterColleges
};
