import express from 'express';
import cors from 'cors'
import config from './config/config.js'
import adminRoute from './routes/adminRoutes.js';
import collegeRoute from './routes/college.routes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import searchRoute from './routes/search.routes.js';
import seatsRoutes from './routes/seatsDistribution.routes.js';

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

app.use(express.json());
app.use(cookieParser());
connectDB();

app.use('/api', adminRoute);
app.use('/api/colleges', collegeRoute);
app.use('/api/search', searchRoute);
app.use('/api/reservationseats', seatsRoutes)

app.listen(config.port, () => {
    console.log(`server is running on ${config.port}`);
});