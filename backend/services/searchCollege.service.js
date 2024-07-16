import College from '../models/collegeDetails.model.js'

const searchCollege = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        // Split the query into words and ensure non-empty words
        const queryWords = query.split(/\s+/).filter(word => word.length > 0);

        // Check if each word matches any document
        for (let word of queryWords) {
            const result = await College.findOne({ 
                $or: [
                    { jrCollegeName: { $regex: word, $options: 'i' } },
                    { popularName: { $regex: word, $options: 'i' } }
                ]
            });

            if (!result) {
                // If any word does not match, return an empty array
                return res.status(200).json({ 
                    message: 'No matches found. Please check your search query.',
                    colleges: [] 
                });
            }
        }

        // If all words match, perform the search using $text operator
        const colleges = await College.find(
            { $text: { $search: query } },
            { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } });

        res.status(200).json({ colleges });
    } catch (error) {
        console.error('searchCollege controller error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { searchCollege };