import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const authenticate = (req, res, next) => {
    // console.log(req);
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Unathorized, no token provided'});
    };

    try {
        const decode = jwt.verify(token, config.jwt);
        req.user = decode;
        next();
    } catch (error) {
        console.error('Token verification failded:', error);
        return res.status(403).json({message: 'Forbidden, token is invalid'});
    }
};

export default authenticate;