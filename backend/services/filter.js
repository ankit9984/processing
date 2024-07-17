import College from "../models/collegeDetails.model.js";
import CollegeStream from "../models/collegeStream.model.js";
import CollegeAddress from "../models/colllegeAddress.model.js";

const filterColleges = async (req, res) => {
    try {
        const {zone, area, status, collegeType, streamName} = req.query;
        console.log(zone, area,status,collegeType,streamName);

        const collegeFilter = {};
        const addressFilter = {};
        const streamFilter = {};

        if(zone) addressFilter.zone = zone;
        if(area) addressFilter.area = area;
        if(status) streamFilter.status = status;
        if(streamName) streamFilter.streamName = streamName;
        if(collegeType) collegeFilter.collegeType = collegeType;

        console.log(collegeFilter, addressFilter, streamFilter);

        let query = College.find(collegeFilter);
        // console.log(query);

        if(Object.keys(addressFilter).length > 0){
            const addressIds = await CollegeAddress.find(addressFilter).distinct('_id');
            console.log(addressIds);
            query = query.where('address').in(addressIds);
        };

        if(Object.keys(streamFilter).length > 0){
            const streamIds = await CollegeStream.find(streamFilter).distinct('_id');
            console.log('stream', streamIds);
            query = query.where('streams').in(streamIds);
        }
        const colleges = await query;
        console.log(colleges);

        res.status(200).json({colleges})
    } catch (error) {
        console.error('filterColleges controller', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export {
    filterColleges
}