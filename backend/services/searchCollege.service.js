import College from "../models/collegeDetails.model.js";

const searchCollege = async (req, res) => {
    try {
        const { query, region } = req.query;
        console.log(query);
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        let aggregationPipeline = [
            {
                $lookup: {
                    from: 'collegeaddresses',
                    localField: 'address',
                    foreignField: '_id',
                    as: 'address'
                }
            },
            {
                $unwind: {
                    path: '$address',
                    preserveNullAndEmptyArrays: true
                }
            }
        ];

        // Add text search if query is provided
        if (query) {
            aggregationPipeline.unshift({
                $match: {
                    $text: { $search: query }
                }
            });
        }

        // Add region filter if provided
        if (region) {
            aggregationPipeline.push({
                $match: {
                    'address.region': region
                }
            });
        }

        // Add remaining stages
        aggregationPipeline.push(
            {
                $project: {
                    jrCollegeName: 1,
                    popularName: 1,
                    'address.area': 1,
                    'address.pinCode': 1,
                    'address.region': 1,
                    score: { $meta: 'textScore' }
                }
            },
            {
                $sort: {
                    score: { $meta: 'textScore' }
                }
            },
            {
                $limit: 10
            }
        );

        const colleges = await College.aggregate(aggregationPipeline);

        console.log(colleges);

        if (colleges.length === 0) {
            return res.status(404).json({ message: 'No colleges found matching the search criteria' });
        }
        
        res.status(200).json({ message: 'Colleges found', colleges });
    } catch (error) {
        console.error('searchCollege controller', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export {
    searchCollege
}
