import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if userId exists in localStorage
        const userId = localStorage.getItem('userId');
        setIsLoggedIn(!!userId); // Convert to boolean
    }, []);

    const handleLogout = () => {

        toast.success("Logout Successfully")
        // Remove user-related data from localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdd');
        localStorage.removeItem('accountNo');
        

        // Update state to reflect logout
        setIsLoggedIn(false);
    };

    const navItems = (
        <>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/cart">Cart</a>
            </li>
            <li>
                <a href="/myorders">My Orders</a>
            </li>
            <li>
                <a href="/myaccount">My Account</a>
            </li>
            <li>
                {isLoggedIn ? (
                    <a
                        href="#"
                        
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigation
                            handleLogout(); // Call logout logic
                        }}
                    >
                        Logout
                    </a>
                ) : (
                    <a
                        href="/login"
                        
                    >
                        Login
                    </a>
                )}
            </li>
        </>
    );


    return (
        <>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 bg-white navbar-fixed">
                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            >
                                {navItems}
                            </ul>
                        </div>
                        <a href="/" className="text-3xl font-extrabold text-gray-800 tracking-wide cursor-pointer flex items-center gap-2">
                            <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
                                Paix
                            </span>
                            <span className="text-sm font-medium text-gray-500">Shop</span>
                        </a>

                    </div>
                    <div className="navbar-end space-x-3">
                        <div className="hidden md:block">
                            <label className="px-3 py-3 border rounded-xl flex items-center gap-2">
                                <input
                                    type="text"
                                    className="grow outline-none"
                                    placeholder="Search"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </label>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">{navItems}</ul>
                        </div>
                        
                        {/* <div>
                            <label className="swap swap-rotate">
                                <input type="checkbox" className="theme-controller" value="synthwave" />
                                <svg
                                    className="swap-off h-8 w-8 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>
                                <svg
                                    className="swap-on h-8 w-8 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
