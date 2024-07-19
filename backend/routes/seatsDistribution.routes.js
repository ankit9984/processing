import express from 'express';
import { createReservation, getReservation, udpateReservation } from '../controllers/collegeReservationController.js';

const router = express.Router();

router.post('/seats/:streamId', createReservation);
router.put('/updateseats/:reservationSeatId', udpateReservation);
router.get('/getseats/:seatId', getReservation);

export default router;