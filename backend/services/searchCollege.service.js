import College from "../models/collegeDetails.model.js";

const searchCollege = async (req, res) => {
    try {
        const {query} = req.query;

        if(!query){
            return res.status(400).json({error: 'Search query is required'})
        };

        const colleges = await College.aggregate([
            {
                $match: {
                    $text: {$search: query}
                }
            },
            {
                $lookup: {
                    from: 'collegeaddresses',
                    localField: 'address',
                    foreignField: '_id',
                    as: 'address'
                }
            },
            {
                $unwind: '$address'
            },
            {
                $project: {
                    jrCollegeName: 1,
                    popularName: 1,
                    'address.area': 1,
                    'address.pinCode': 1,
                    score: {$meta: 'textScore'}
                }
            },
            {
                $sort: {
                    score: {$meta: 'textScore'}
                }
            },
            {
                $limit: 10
            }
        ])

        console.log(colleges);

        if(colleges.length === 0){
            return res.status(404).json({message: 'No colleges found matching the search query'})
        };
        
        res.status(200).json({message: 'Colleges found', colleges})
    } catch (error) {
        console.error('searchCollege controller', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export {
    searchCollege
}