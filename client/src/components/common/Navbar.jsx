import React, { useState } from 'react';
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

function Navbar() {
    const [isActive, setIsActive] = useState(false);

    const handleActive = () => {
        setIsActive(!isActive);
    }

    return (
        <div className='relative flex justify-between p-5 shadow-lg h-14 items-center'>
            <div>
                <img src="" alt="Jr College" />
            </div>
            <div className='flex justify-between items-center gap-5'>
                <div>
                    <CiSearch size={30} />
                </div>
                <div>
                    {isActive ? <IoMdClose onClick={handleActive} size={30} /> : <CiMenuBurger onClick={handleActive} size={25} />}
                </div>

                <div className={`absolute flex flex-col gap-2 py-4 top-14 right-0 shadow-lg h-screen w-3/4 sm:w-1/2 transform transition-transform duration-500 bg-white ${isActive ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className='py-4 pl-2 border border-l-0 border-r-0 border-black'>
                        <p>Explore Colleges</p>
                    </div>
                    <div className='py-4 pl-2 border border-l-0 border-r-0 border-black'>
                        <p>Explore Colleges</p>
                    </div>
                    <div className='py-4 pl-2 border border-l-0 border-r-0 border-black'>
                        <p>Explore Colleges</p>
                    </div>
                    <div className='py-4 pl-2 border border-l-0 border-r-0 border-black'>
                        <p>Explore Colleges</p>
                    </div>
                    <div className='py-4 pl-2 border border-l-0 border-r-0 border-black'>
                        <p>Explore Colleges</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
