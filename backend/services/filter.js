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
                    from: 'collegeaddresses', 
                    localField: 'address', 
                    foreignField: '_id', 
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
            // {
            //     $project: {
            //         jrCollegeName: 1,
            //         udiseNumber: 1,
            //         collegeType: 1,
            //         'fullAddress.area': 1,
            //         'fullAddress.pinCode': 1
            //     }
            // },
            {
                $group: {
                    _id: null, // Group by region
                    totalColleges: { $sum: 1 }, // Count number of colleges per region
                    colleges: {
                        $push: {
                            collegeName: '$jrCollegeName',
                            UDISENO: '$udiseNumber',
                            collegeType: '$collegeType',
                            area: '$fullAddress.area',
                            pinCode: '$fullAddress.pinCode' 
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

        console.log(pipeline);
        

        // Execute the aggregation query
        const colleges = await College.aggregate(pipeline);

        // Return the results
        res.status(200).json({message: 'Colleges filter successfully', colleges});
    } catch (error) {
        console.error('filterColleges controller', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export {
    filterColleges
};
