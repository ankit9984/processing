import CollegeAddress from "../models/colllegeAddress.model.js";

const filterColleges = async (req, res) => {
    try {
        const { zone, area } = req.query;

        let filterCriteria = {};
        if (zone) filterCriteria.zone = zone;
        if (area) filterCriteria.area = area;

        if (!zone && !area) {
            return res.status(400).json({ message: 'Please provide zone or area to filter' });
        }

        console.log(filterCriteria);

        const addresses = await CollegeAddress.find(filterCriteria).populate('college');
        const colleges = addresses.map(address => address.college);

        res.status(200).json({ message: 'Colleges filtered successfully', colleges });
    } catch (error) {
        console.error('filterColleges controller', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export {
    filterColleges
}