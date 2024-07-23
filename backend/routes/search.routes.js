import express from 'express';
import { filterColleges } from '../services/filter.js';
import { searchCollege } from '../services/searchCollege.service.js';

const router = express.Router();

router.get('/colleges/filter', filterColleges);
router.get('/searchcolleges', searchCollege);

export default router