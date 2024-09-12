import React, { useState, useEffect } from 'react';

const Navbar = ({ onAboutUsClick }) => {
    const [balanceText, setBalanceText] = useState('Balance');
    const [showingBalance, setShowingBalance] = useState(false);

    const handleCheckBalance = () => {
        if (!showingBalance) {
            // Simulate fetching balance (replace this with actual balance fetching logic)
            setBalanceText('$2,350.00');
            setShowingBalance(true);

            // After 5 seconds, revert back to "Check Balance"
            setTimeout(() => {
                setBalanceText('Balance');
                setShowingBalance(false);
            }, 5000);
        }
    };

    const navItems = (
        <>
            <li>
                <a>Home</a>
            </li>
            <li>
                <a>Cart</a>
            </li>
            <li>
                <a>About us</a>
            </li>
            <li>
                <a>Jobs</a>
            </li>
        </>
    );

    return (
        <>
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 bg-white navbar-fixed'>
                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {navItems}
                            </ul>
                        </div>
                        <a href='/' className="text-2xl font-bold cursor-pointer">Paix</a>
                    </div>
                    <div className='navbar-end space-x-3'>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                <li>
                                    <a href='/'>Home</a>
                                </li>
                                <li>
                                    <a href='/cart'>Cart</a>
                                </li>
                                <li>
                                    <a href='/aboutus'> About us</a>
                                </li>
                               
                            </ul>
                        </div>
                        <div className='hidden md:block'>
                            <label className="px-3 py-3 border rounded-xl flex items-center gap-2">
                                <input type="text" className="grow outline-none" placeholder="Search" />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd" />
                                </svg>
                            </label>
                        </div>
                        
                        <div className="">
                            <a href='/' className="bg-black px-3 py-2 text-white cursor-pointer rounded-md hover:bg-slate-800">Login</a>
                        </div>

                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
