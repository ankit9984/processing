import College from "../models/collegeDetails.model.js";


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
            // {
            //     $unwind: '$streams'
            // },
            {
                $lookup: {
                    from: 'collegeaddresses', // Collection name for Address model
                    localField: 'address', // Field in the College collection
                    foreignField: '_id', // Field in the Address collection
                    as: 'fullAddress'
                }
            },
            {
                $unwind: {
                    path: '$fullAddress',
                    preserveNullAndEmptyArrays: true // Keep documents even if address is not found
                }
            },
            {
                $match: {
                    ...(region ? { 'fullAddress.region': region } : {}),
                    ...(zone ? { 'fullAddress.zone': zone } : {}),
                    ...(area ? { 'fullAddress.area': area } : {}),
                    ...(collegeType ? { collegeType: collegeType } : {}),
                    ...(streamName ? { 'streams.streamName': streamName } : {}),
                    ...(status ? { 'streams.status': status } : {}),
                    ...(medium ? { 'streams.medium': medium } : {}),
                    ...(minority ? { 'streams.minority': minority } : {})
                }
            },
            {
                $group: {
                    _id: null, // Group by region
                    totalColleges: { $sum: 1 }, // Count number of colleges per region
                    colleges: {
                        $push: {
                            jrCollegeName: '$jrCollegeName',
                            UDISENO: '$udiseNumber',
                            collegeType: '$collegeType',
                            address: '$fullAddress.address', // Include full address details
                            // streams: '$streams'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0, // Exclude _id field
                    region: '$_id', // Rename _id to region
                    totalColleges: 1,
                    colleges: 1 // Include all fields in colleges
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
