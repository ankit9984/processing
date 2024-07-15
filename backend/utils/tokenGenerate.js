import jwt from 'jsonwebtoken';
import config from '../config/config.js'

const generateToken = (id) => {
    const token = jwt.sign({id}, config.jwt, {expiresIn: '1h'});
    return token;
};

const setJwtCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000
    })
};

export {
    generateToken,
    setJwtCookie
}