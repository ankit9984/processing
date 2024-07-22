import Admin from "../models/adminModel.js";
import { generateToken, setJwtCookie } from "../utils/tokenGenerate.js";
import bcrypt from 'bcryptjs';

const registerAdmin = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(404).json({error: 'All field are required'})
        }

        const existingAdmin = await Admin.findOne({
            $or: [
                {email: email},
                {username: username}
            ],
        });

        if(existingAdmin){
            if(existingAdmin.email === email){
                return res.status(404).json({error: 'Email is already exist'})
            }
            if(existingAdmin.username === username){
                return res.status(404).json({error: 'Username is already exist'})
            }
        };

        const admin = new Admin({
            username,
            email,
            password
        });

        await admin.save();
        
        const token = generateToken(admin._id);
        setJwtCookie(res, token);

        res.status(200).json({message: 'Admin register successfully', admin});
    } catch (error) {
        console.log('registerAdmin controller', error);
        res.status(500).json({message: 'Server error'})
    }
};

const loginAdmin = async (req, res) => {
    try {
        const {username, password} = req.body;
        console.log(username, password);
        const existAdmin = await Admin.findOne({username});
        if(!existAdmin){
            return res.status(404).json({error: 'Invalid email or password'})
        };

        const isMatch = await bcrypt.compare(password, existAdmin.password);
        if(!isMatch){
            return res.status(404).json({error: 'Invalid email or password'})
        };

        const token = generateToken(existAdmin._id);
        setJwtCookie(res, token);

        res.status(200).json({message: 'Logged in successfully', admin: existAdmin, token});
    } catch (error) {
        console.error('loginAdmin controller', error);
        res.status(500).json({message: 'Server error'})
    }
};

const logoutAdmin = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({message: 'Logged out successfully'})
}

export {
    registerAdmin,
    loginAdmin,
    logoutAdmin
}