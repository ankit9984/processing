import express from 'express';
import { filterColleges } from '../services/filter.js';
import { searchCollege } from '../services/searchCollege.service.js';
import { getCitiesByZone, getZoneByRegion } from '../utils/zoneUtils.js';

const router = express.Router();

router.get('/colleges/filter', filterColleges);
router.get('/searchcolleges', searchCollege);

router.get('/get-by-zone', getCitiesByZone);
router.get('/get-by-region', getZoneByRegion);

export default router