import express from 'express';
import { getCollege, registerCollege, updateCollege } from '../controllers/collegeDetails.controller.js';
import authenticate from '../middlewares/authMiddleware.js';
import { getCollegeAddress, registerCollegeAddress, updateCollegeAddress } from '../controllers/collegeAddress.controller.js';
import { getStream, registerStream, updateStream } from '../controllers/collegeStream.controller.js';
import { addFee } from '../controllers/collegeFee.controller.js';

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

export default router;