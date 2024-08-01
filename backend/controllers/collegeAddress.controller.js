import College from "../models/collegeDetails.model.js";
import CollegeAddress from "../models/colllegeAddress.model.js";

const registerCollegeAddress = async (req, res) => {
    try {

        const {collegeId} = req.params;

        const {address, area, city, zone, region, pinCode, nearestLandMark, nearestBusStop,nearestRailwayStation,distanceOfStation} = req.body;

        const college = await College.findById(collegeId);
        if(!college){
            return res.status(404).json({error: 'College not found'})
        }

        if (!address || !area || !city || !zone || !region || !pinCode || !nearestLandMark || !nearestBusStop || !nearestRailwayStation || !distanceOfStation) {
            return res.status(400).json({ message: 'All fields are required' });
        };

        if(college.address){
            return res.status(400).json({message: 'College already has an address'})
        }

        const newCollegeAddress = new CollegeAddress({
            college: collegeId,
            address,
            area,
            city,
            zone,
            region,
            pinCode,
            nearestLandMark,
            nearestBusStop,
            nearestRailwayStation,
            distanceOfStation
        });

        await newCollegeAddress.save();

        college.address = newCollegeAddress._id;
        await college.save();
        

        res.status(200).json({message: 'College address added successfully', newCollegeAddress})
    } catch (error) {
        console.error('registerCollegeAddress controller', error);
        res.status(500).json({message: 'Server error'})
    }
};

const updateCollegeAddress = async (req, res) => {
    try {
        const {collegeId} = req.params;
        const {addressId} = req.params;
        console.log(addressId);
        const {address, area, city, zone, region, pinCode, nearestBusStop, nearestLandMark, nearestRailwayStation, distanceOfStation} = req.body;

        const college = await College.findById(collegeId);
        if(!college){
            return res.status(400).json({error: 'College not found'})
        };

        const collegeAddress = await CollegeAddress.findById(addressId);
        if(!collegeAddress){
            return res.status(404).json({error: 'CollegeAddress not found'})
        };

        collegeAddress.address = address || collegeAddress.address;
        collegeAddress.area = area || collegeAddress.area;
        collegeAddress.city = city || collegeAddress.city;
        collegeAddress.zone = zone || collegeAddress.zone;
        collegeAddress.region = region || collegeAddress.region;
        collegeAddress.pinCode = pinCode || collegeAddress.pinCode;
        collegeAddress.nearestLandMark = nearestLandMark || collegeAddress.nearestLandMark;
        collegeAddress.nearestBusStop = nearestBusStop || collegeAddress.nearestBusStop;
        collegeAddress.nearestRailwayStation = nearestRailwayStation || collegeAddress.nearestRailwayStation;
        collegeAddress.distanceOfStation = distanceOfStation || collegeAddress.distanceOfStation;

        await collegeAddress.save();

        res.status(200).json({message: 'College address updated successfully', collegeAddress})
    } catch (error) {
        console.error('updateCollegeAddress controller', error);
        res.status(500).json({message: 'Server error'})
    }
}

const getCollegeAddress = async (req, res) => {
    try {
        const {addressId} = req.params;

        const collegeAddress = await CollegeAddress.findById(addressId)
        .select('-_id -college -createdAt -updatedAt -__v');

        if(!collegeAddress){
            return res.status(400).json({error: 'College Address not found'});
        };

        console.log(collegeAddress);

        res.status(200).json({message: 'College address found successfully', collegeAddress})
    } catch (error) {
        console.error('getCollegeAddress controller', error);
        res.status(500).json({message: 'Server error'})
    }
}

export {
    registerCollegeAddress,
    updateCollegeAddress,
    getCollegeAddress
}