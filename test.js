import College from "../models/collegeDetails.model.js";
import redis from 'redis';
import util from 'util';

// Initialize Redis client
const redisClient = redis.createClient(process.env.REDIS_URL);
const getAsync = util.promisify(redisClient.get).bind(redisClient);
const setexAsync = util.promisify(redisClient.setex).bind(redisClient);

const filterColleges = async (req, res) => {
    try {
        const { zone, area, status, collegeType, streamName, page = 1, limit = 10 } = req.query;
        
        // Create a cache key based on the query parameters
        const cacheKey = `colleges:${JSON.stringify(req.query)}`;
        
        // Try to get the result from cache
        const cachedResult = await getAsync(cacheKey);
        if (cachedResult) {
            return res.status(200).json(JSON.parse(cachedResult));
        }

        // If not in cache, perform the database query
        const filter = {};
        if (zone) filter['address.zone'] = new RegExp(zone, 'i');
        if (area) filter['address.area'] = new RegExp(area, 'i');
        if (status) filter['streams.status'] = status;
        if (collegeType) filter.collegeType = collegeType;
        if (streamName) filter['streams.streamName'] = new RegExp(streamName, 'i');

        // Use a compound index for efficient querying
        const colleges = await College.aggregate([
            { $match: filter },
            { $skip: (page - 1) * limit },
            { $limit: parseInt(limit) },
            {
                $project: {
                    jrCollegeName: 1,
                    udiseNumber: 1,
                    collegeType: 1,
                    address: 1,
                    streams: {
                        $filter: {
                            input: '$streams',
                            as: 'stream',
                            cond: { $eq: ['$$stream.status', status] }
                        }
                    }
                }
            }
        ]).hint({ 'address.zone': 1, 'address.area': 1, 'streams.status': 1, collegeType: 1, 'streams.streamName': 1 });

        const total = await College.countDocuments(filter);

        const result = {
            colleges,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalColleges: total
        };

        // Cache the result for 5 minutes
        await setexAsync(cacheKey, 300, JSON.stringify(result));

        res.status(200).json(result);
    } catch (error) {
        console.error('filterColleges controller error:', error);
        res.status(500).json({ message: 'An error occurred while filtering colleges.' });
    }
};

export { filterColleges };