import express from 'express';
import { searchCollege } from '../services/searchCollege.service.js';
import { filterColleges } from '../services/filter.js';

const router = express.Router();

router.get('/searchcolleges', searchCollege);
router.get('/colleges/filter', filterColleges);

export default router