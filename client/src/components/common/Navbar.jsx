import React, { useEffect, useState, useRef } from 'react'
import logo from '../../assets/images/logo.png'
import { IoIosClose, IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    // console.log('UseRef', menuRef.current);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            // console.log(menuRef.current);
            if(menuRef.current && !menuRef.current.contains(event.target)){
                setIsOpen(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    },[]);

    const navItems = [
        { title: 'Explore Colleges', path: '/explore' },
        { title: 'Admission Cutoffs', path: '/cutoffs' },
        { title: 'Predict Chances', path: '/predict' }
    ]

    return (
        <div className='relative flex justify-between items-center px-5 bg-blue-500 w-full h-14'>
            <div className='w-14'>
                <img src={logo} alt="" />
            </div>
            <div className='hidden sm:flex gap-5 text-white'>
                {/* <p className='cursor-pointer'>Explore Colleges</p>
                <p className='cursor-pointer'>Admission CutOffs</p>
                <p className='cursor-pointer'>Predict Chances</p> */}
                {navItems.map((item) => (
                    <p className='cursor-pointer'>{item.title}</p>
                ))}
            </div>
            <div className='sm:hidden' ref={menuRef}>
                <div className=''>
                    <span  onClick={toggleMenu}>{isOpen ? <IoIosClose size={25}/> : <IoIosMenu size={25}/>}</span>
                </div>
                {/* {isOpen && ( */}
                <div className={`fixed top-14 right-0 w-1/2 h-screen transform transition-transform duration-300 ease-in-out bg-white shadow-lg p-5 ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${isOpen && 'w-[75%] sm:w-[50%]'}`}>
                    <div className='flex flex-col gap-2'>
                        {/* <p className='cursor-pointer'>Explore Colleges</p>
                        <p className='cursor-pointer'>Admission CutOffs</p>
                        <p className='cursor-pointer'>Predict Chances</p> */}

                        {navItems.map((items) => (
                            <p className='cursor-pointer'>{items.title}</p>
                        ))}
                    </div>
                </div>
                {/* )} */}
            </div>
        </div>
    )
}

export default Navbar
