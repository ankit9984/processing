import Admin from "../models/adminModel.js";
import College from "../models/collegeDetails.model.js";
import generateSlug from "../utils/urlGenerate.js";

const registerCollege = async (req, res) => {
    try {
        const {id} = req.user;
        const {udiseNumber,jrCollegeName, popularName,societyManagement, typeOfManagement,yearOfFoundation,attachedTo,collegeType} = req.body;

        if (!udiseNumber || !jrCollegeName || !popularName || !societyManagement || !typeOfManagement || !yearOfFoundation || !attachedTo || !collegeType) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if(!await Admin.findById(id)){
            return res.status(400).json({error: 'admin not found'})
        }
        
       if(await College.findOne({udiseNumber})){
            return res.status(400).json({error: 'udiseNumber is already takend'})
       }

       let slug = generateSlug(jrCollegeName);
       let existingSlug = await College.findOne({slug});

       while(existingSlug){
            slug = generateSlug(`${jrCollegeName}-${Math.floor(Math.random()*10000)}`);
            existingSlug = await College.findOne({slug})
       };

        const newCollege = new College({
            udiseNumber,
            jrCollegeName,
            popularName,
            societyManagement,
            typeOfManagement,
            yearOfFoundation,
            attachedTo,
            collegeType,
            slug
        });

        await newCollege.save();

        res.status(200).json({message: 'College added successfully', newCollege})
    } catch (error) {
        console.log('registerCollege controller', error);
        res.status(500).json({message: 'Server error'})
    }
};

const updateCollege = async (req, res) => {
    try {
        const {collegeId} = req.params;

        const { udiseNumber, jrCollegeName, popularName, societyManagement, typeOfManagement, yearOfFoundation, attachedTo, collegeType } = req.body;

        const college = await College.findById(collegeId);
        if(!college){
            return res.status(404).json({message: 'College not found'})
        };



        if(udiseNumber !== college.udiseNumber){
            const existingCollege = await College.findOne({udiseNumber});
            if(existingCollege){
                return res.status(400).json({error: 'udiseNumber should be unique'})
            }
            college.udiseNumber = udiseNumber || college.udiseNumber;
        }

        
        college.jrCollegeName = jrCollegeName || college.jrCollegeName;
        college.popularName = popularName || college.popularName;
        college.societyManagement = societyManagement || college.societyManagement;
        college.typeOfManagement = typeOfManagement || college.typeOfManagement;
        college.yearOfFoundation = yearOfFoundation || college.yearOfFoundation;
        college.attachedTo = attachedTo || college.attachedTo;
        college.collegeType = collegeType || college.collegeType;

        if(jrCollegeName && jrCollegeName !== college.jrCollegeName){
                let newSlug = generateSlug(jrCollegeName);
                let existingSlug = await College.findOne({slug: newSlug});
                console.log(newSlug);

            while(existingSlug){
                newSlug = generateSlug(`${jrCollegeName}-${Math.floor(Math.random() * 10000)}`);
                existingSlug = await College.findOne({slug: newSlug});
                console.log(newSlug);
            };

            college.slug = newSlug;
        }

        await college.save();
        res.status(200).json({message: 'College updated successfully', college})
    } catch (error) {
        console.error('updateCollege controller', error);
        res.status(500).json({message: 'Server error'})
    }
}

const getCollege = async (req, res) => {
    try {
        const {collegeId} = req.params;

        const college = await College.findById(collegeId);
        if(!college){
            return res.status(400).json({error: 'College not found'})
        };

        res.status(200).json({message: 'College found successfully', college})
    } catch (error) {
        console.error('getCollege controller', error);
        res.status(500).json({message: 'Server error'})
    }
}

const getCollegeBYSlug = async (req, res) => {
    try {
        const {slug} = req.params;
        console.log(slug);
        const college = await College.findOne({slug});
        if(!college){
            return res.status(250).json({message: "No College Found", college: []})
        };

        res.status(201).json({message: 'CollegeInfo retrieve successfully', college})
    } catch (error) {
        console.error('getCollegeBYSlug controller', error.message);
        res.status(500).json({message: 'Server error'})
    }
}


export {
    registerCollege,
    updateCollege,
    getCollege,
    getCollegeBYSlug
}