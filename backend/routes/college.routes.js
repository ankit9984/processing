import express from 'express';
import { getCollege, getCollegeBYSlug, registerCollege, updateCollege } from '../controllers/collegeDetails.controller.js';
import authenticate from '../middlewares/authMiddleware.js';
import { getCollegeAddress, registerCollegeAddress, updateCollegeAddress } from '../controllers/collegeAddress.controller.js';
import { getFullStreamDetailsByStreamId, getStream, getStreamInfoByCollegeId, getStreamInfoByCollegeUrl, registerStream, updateStream } from '../controllers/collegeStream.controller.js';
import { addFee, getFee, updateFee } from '../controllers/collegeFee.controller.js';
import { addSubject, get, getSubject, updateSubject } from '../controllers/collegeOptionalSubject.controller.js';
import { registerCutOff } from '../controllers/collegeCutOff.controller.js';
import { createBifocalSubject, getAllBifocalSubjects, getBifocalSubjectById, updateBifocalSubject, deleteBifocalSubject } from '../controllers/collegeBifocalSubjectController.js';


const router = express.Router();



router.post('/registercollege',authenticate , registerCollege);
router.put('/updatecollege/:collegeId', authenticate , updateCollege);
router.get('/getcollege/:collegeId', getCollege);
router.get('/getcollege/slug/:slug', getCollegeBYSlug);


router.post('/addaddress/:collegeId', registerCollegeAddress);
router.put('/updatecollegeaddress/:collegeId/:addressId', updateCollegeAddress);
router.get('/getcollegeaddress/:addressId', getCollegeAddress);

router.post('/addstream/:collegeId', registerStream);
router.put('/updatestream/:collegeId/:streamId', updateStream);
router.get('/getstream/:streamId', getStream);
router.get('/getstreaminfobycollegeid/:collegeId', getStreamInfoByCollegeId);
router.get('/getstreaminfobycollegeurl/:slug/course-fees', getStreamInfoByCollegeUrl);
router.get('/getstreamdetailsbystreamid/:streamId', getFullStreamDetailsByStreamId);

// Bifocal Subject routes
router.post('/bifocal-subjects', createBifocalSubject);
router.get('/bifocal-subjects', getAllBifocalSubjects);
router.get('/bifocal-subjects/:id', getBifocalSubjectById);
router.put('/bifocal-subjects/:id', updateBifocalSubject);
router.delete('/bifocal-subjects/:id', deleteBifocalSubject);

router.post('/addfee/:streamId', addFee);
router.put('/updatefee/:feeId', updateFee);
router.get('/getfee/:feeId', getFee);

router.post('/addsubject/:streamId', addSubject);
router.put('/updatesubject/:subjectId', updateSubject);
router.get('/getsubject/:subjectId', getSubject)
router.get('/get', get);

router.post('/addcutoff/:streamId', registerCutOff);

export default router;