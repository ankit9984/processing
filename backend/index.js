import express from 'express';
import config from './config/config.js'
import adminRoute from './routes/adminRoutes.js';
import collegeRoute from './routes/college.routes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
connectDB();

app.use('/api', adminRoute);
app.use('/api/colleges', collegeRoute)

app.listen(config.port, () => {
    console.log(`server is running on ${config.port}`);
});