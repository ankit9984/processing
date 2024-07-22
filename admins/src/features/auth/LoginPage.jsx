import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle, FaLinkedinIn, FaLock, FaTwitter, FaUser } from 'react-icons/fa'
import { loginAdmin } from './AuthSlice';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordvisible, setPasswordVisible] = useState(false);

    const dispatch = useDispatch();
    const {isLoading, error} = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAdmin({username, password}));
    }
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900'>
            <div className='w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md'>
                <h2 className='text-2xl font-semibold text-white text-center'>Welcome to Smart</h2>
                <p className='text-center text-sm text-gray-400 mb-6'>Need a Account? <a href="#" className='text-blue-500'>Sign Up</a></p>
                <div className='flex justify-around mb-6'>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded-lg'>Admin</button>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded-lg'>Teacher</button>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded-lg'>Student</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-400 mb-2'>Username</label>
                        <div className='relative'>
                            <input type="text"
                                className='w-full px-4 py-2 bg-gray-700 text-white rounded-lg' 
                                placeholder='admin@school.org'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <FaUser className='absolute right-3 top-3 text-gray-400' />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-400 mb-2'>Password</label>
                        <div className='relative'>
                            <input
                                type={passwordvisible ? 'text' : 'password'}
                                className='w-full px-4 py-2 bg-gray-700 text-white rounded-lg'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FaLock className='absolute right-3 top-3 text-gray-400 cursor-pointer' />
                            {passwordvisible ? (
                                <FaEyeSlash
                                    className='absolute right-3 top-3 text-gray-400 cursor-pointer'
                                    onClick={() => setPasswordVisible(false)}
                                />
                            ) : (
                                <FaEye
                                    className='absolute right-3 top-3 text-gray-400 cursor-pointer'
                                    onClick={() => setPasswordVisible(true)}
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex justify-between items-center mb-6'>
                        <label className='flex items-center text-gray-400'>
                            <input type="checkbox" className='mr-2' /> Remember me
                        </label>
                        <label>
                            <a href="#" className='text-sm text-gray-400'>Forgot Password?</a>
                        </label>
                    </div>
                    <button className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Login</button>
                </form>
                <div className='mt-6 text-center text-gray-400'>
                    OR
                </div>
                <div className='flex justify-around mt-6'>
                    <FaGoogle className='text-gray-400 cursor-pointer'/>
                    <FaFacebook className='text-gray-400 cursor-pointer'/>
                    <FaTwitter className='text-gray-400 cursor-pointer'/>
                    <FaLinkedinIn className='text-gray-400 cursor-pointer'/>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
