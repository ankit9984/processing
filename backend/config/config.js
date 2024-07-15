import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    db: process.env.MONGO_URI,
    jwt: process.env.JWT_SECRET
};

export default config;