import College from "../models/collegeDetails.model.js";

const filterColleges = async (req, res) => {
    try {
        const { zone, area, status, collegeType, streamName } = req.query;

        const pipeline = [
            // Lookup CollegeAddress
            {
                $lookup: {
                    from: 'collegeaddresses',
                    localField: 'address',
                    foreignField: '_id',
                    as: 'addressDetails'
                }
            },
            { $unwind: '$addressDetails' },

            // Lookup CollegeStream
            {
                $lookup: {
                    from: 'collegestreams',
                    localField: 'streams',
                    foreignField: '_id',
                    as: 'streamDetails'
                }
            },

            // Match stage for filtering
            {
                $match: {
                    $and: [
                        zone ? { 'addressDetails.zone': zone } : {},
                        area ? { 'addressDetails.area': area } : {},
                        collegeType ? { 'collegeType': collegeType } : {},
                        status || streamName ? {
                            'streamDetails': {
                                $elemMatch: {
                                    ...(status && { status }),
                                    ...(streamName && { streamName })
                                }
                            }
                        } : {}
                    ]
                }
            },

            // Project stage to shape the output
            {
                $project: {
                    _id: 1,
                    udiseNumber: 1,
                    jrCollegeName: 1,
                    popularName: 1,
                    collegeType: 1,
                    address: {
                        zone: '$addressDetails.zone',
                        area: '$addressDetails.area',
                        city: '$addressDetails.city',
                        pinCode: '$addressDetails.pinCode'
                    },
                    streams: {
                        $filter: {
                            input: '$streamDetails',
                            as: 'stream',
                            cond: {
                                $and: [
                                    status ? { $eq: ['$$stream.status', status] } : {},
                                    streamName ? { $eq: ['$$stream.streamName', streamName] } : {}
                                ]
                            }
                        }
                    }
                }
            }
        ];

        const colleges = await College.aggregate(pipeline);

        res.status(200).json({count: colleges.length, colleges});
    } catch (error) {
        console.error('filterColleges controller', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export {
    filterColleges
};