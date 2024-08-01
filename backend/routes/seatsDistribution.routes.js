import express from 'express';
import { createReservation, getReservation, getReservationSeatsInfoBycollegeId, getSeatsInfoByStreamId, udpateReservation } from '../controllers/collegeReservationController.js';

const router = express.Router();

router.post('/seats/:streamId', createReservation);
router.put('/updateseats/:reservationSeatId', udpateReservation);
router.get('/getseats/:seatId', getReservation);
router.get('/getstreamandseatsinfo/:collegeId', getReservationSeatsInfoBycollegeId);
router.get('/getseatsinfobystreamid/:streamId', getSeatsInfoByStreamId);

export default router;