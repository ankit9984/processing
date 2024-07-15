import express from 'express';
import { loginAdmin, logoutAdmin, registerAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/registeradmin', registerAdmin);
router.post('/loginadmin', loginAdmin);
router.post('/logoutadmin', logoutAdmin);

export default router;