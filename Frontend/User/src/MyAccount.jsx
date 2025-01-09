import React, { useState, useEffect } from 'react';
import {
    UserCircleIcon,
    ShoppingBagIcon,
    HeartIcon,
    MapPinIcon,
    CreditCardIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import Navbar from './components/Navbar';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { name: 'Personal Info', icon: UserCircleIcon },
        { name: 'Wishlist', icon: HeartIcon },
        { name: 'Addresses', icon: MapPinIcon },
        { name: 'Payment Methods', icon: CreditCardIcon },
    ];

    return (
        <div className="w-64 bg-white shadow-md rounded-lg p-4">
            {tabs.map((tab) => (
                <button
                    key={tab.name}
                    className={`flex items-center w-full p-3 rounded-md mb-2 transition-all ${activeTab === tab.name
                        ? 'bg-blue-100 text-blue-600'
                        : 'hover:bg-gray-100'
                        }`}
                    onClick={() => setActiveTab(tab.name)}
                >
                    <tab.icon className="w-5 h-5 mr-3" />
                    {tab.name}
                </button>
            ))}
        </div>
    );
};

const MyAccount = () => {
    const [activeTab, setActiveTab] = useState('Personal Info');
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1 (555) 123-4567',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editFields, setEditFields] = useState({ ...userInfo });
    const [accountNo, setAccountNo] = useState(null); // State for storing accountNo

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditFields({ ...userInfo });
    };

    const handleSaveClick = () => {
        setUserInfo({ ...editFields });
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFields({ ...editFields, [name]: value });
    };

    // Retrieve accountNo when "Payment Methods" tab is selected
    useEffect(() => {
        if (activeTab === 'Payment Methods') {
            const storedAccountNo = localStorage.getItem('accountNo');
            setAccountNo(storedAccountNo || 'No account information found.');
        }
    }, [activeTab]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">My Account</h1>
                <div className="flex flex-col md:flex-row gap-6">
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="flex-grow">
                        {activeTab === 'Personal Info' && (
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-700">Personal Information</h2>
                                {/* Your Personal Info content */}
                            </div>
                        )}

                        {activeTab === 'Wishlist' && (
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-700">Your Wishlist</h2>
                                <p className="text-gray-600">Your wishlist is empty.</p>
                            </div>
                        )}

                        {activeTab === 'Addresses' && (
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-700">Your Addresses</h2>
                                <p className="text-gray-600">You have no saved addresses.</p>
                            </div>
                        )}

                        {activeTab === 'Payment Methods' && (
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment Methods</h2>
                                <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                                    <h3 className="text-lg font-medium text-blue-700">Account Details</h3>
                                    {accountNo ? (
                                        <div className="mt-2">
                                            <p className="text-gray-700 text-sm">Here are your saved payment details:</p>
                                            <div className="flex items-center mt-3">
                                                <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex justify-center items-center mr-3">
                                                    <CreditCardIcon className="w-6 h-6" />
                                                </span>
                                                <div>
                                                    <p className="text-gray-900 font-semibold">Account Number</p>
                                                    <p className="text-gray-600 text-sm">{accountNo}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center mt-4">
                                            <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-3"></span>
                                            <p className="text-gray-500 text-sm">Loading account information...</p>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-6">
                                    <button className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm">
                                        Add New Payment Method
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
