import express from 'express';
import { getCollege, registerCollege, updateCollege } from '../controllers/collegeDetails.controller.js';
import authenticate from '../middlewares/authMiddleware.js';
import { getCollegeAddress, registerCollegeAddress, updateCollegeAddress } from '../controllers/collegeAddress.controller.js';
import { getStream, registerStream, updateStream } from '../controllers/collegeStream.controller.js';
import { addFee, getFee, updateFee } from '../controllers/collegeFee.controller.js';
import { addSubject, getSubject, updateSubject } from '../controllers/collegeOptionalSubject.controller.js';

const router = express.Router();

router.use(authenticate);

router.post('/registercollege', registerCollege);
router.put('/updatecollege/:collegeId', updateCollege);
router.get('/getcollege/:collegeId', getCollege);


router.post('/addaddress/:collegeId', registerCollegeAddress);
router.put('/updatecollegeaddress/:collegeId/:addressId', updateCollegeAddress);
router.get('/getcollegeaddress/:addressId', getCollegeAddress);

router.post('/addstream/:collegeId', registerStream);
router.put('/updatestream/:collegeId/:streamId', updateStream);
router.get('/getstream/:streamId', getStream);

router.post('/addfee/:streamId', addFee);
router.put('/updatefee/:feeId', updateFee);
router.get('/getfee/:feeId', getFee);

router.post('/addsubject/:streamId', addSubject);
router.put('/updatesubject/:subjectId', updateSubject);
router.get('/getsubject/:subjectId', getSubject)

export default router;