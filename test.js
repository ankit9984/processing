import React, { useEffect, useState, useRef } from 'react';
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = [
        { title: 'Explore Colleges', path: '/explore' },
        { title: 'Admission Cutoffs', path: '/cutoffs' },
        { title: 'Predict Chances', path: '/predict' }
    ];

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" aria-label="Home">
                            <img className="h-8 w-auto" src="/logo.png" alt="Company Logo" />
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        {navItems.map((item) => (
                            <Link key={item.path} to={item.path} className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                    <div className="sm:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-600" aria-label={isOpen ? 'Close menu' : 'Open menu'}>
                            {isOpen ? <IoMdClose size={24} /> : <IoIosMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div ref={menuRef} className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <Link key={item.path} to={item.path} className="text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;