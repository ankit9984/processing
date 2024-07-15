import mongoose from 'mongoose';
import config from './config.js'

const connectDB = async () => {
    try {
        await mongoose.connect(config.db);
        console.log('Database connect successfully');
    } catch (error) {
        console.log('Something went wrong',error);
        process.exit(1);
    }
};

export default connectDB;