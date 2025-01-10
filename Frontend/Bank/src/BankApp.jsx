import React, { useState } from "react";

export default function BankApp() {
    const [currentSection, setCurrentSection] = useState("dashboard");
    const [showBalance, setShowBalance] = useState(false);
    const [secretKey, setSecretKey] = useState("123456");
    const [editingKey, setEditingKey] = useState(false);
    const [transactionHistory, setTransactionHistory] = useState([
        { id: "TXN12345", amount: "$500.00", date: "2025-01-10", time: "12:45 PM" },
        { id: "TXN12346", amount: "$250.00", date: "2025-01-09", time: "3:30 PM" },
        { id: "TXN12347", amount: "$150.00", date: "2025-01-08", time: "10:15 AM" },
    ]);

    const handleAddBalance = () => {
        alert("Add balance functionality is not implemented yet!");
    };

    const handleLogout = () => {
        alert("You have successfully logged out!");
    };

    return (
        <div className="min-h-screen flex bg-zinc-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="px-6 py-4">
                    <h1 className="text-2xl font-bold text-blue-700">ProBank</h1>
                </div>
                <nav className="px-4 space-y-2">
                    <button
                        onClick={() => setCurrentSection("dashboard")}
                        className={`flex items-center px-4 py-2 w-full text-left rounded-md hover:bg-gray-100 ${currentSection === "dashboard" ? "bg-blue-100 text-blue-700" : "text-gray-700"
                            }`}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setCurrentSection("myinfo")}
                        className={`flex items-center px-4 py-2 w-full text-left rounded-md hover:bg-gray-100 ${currentSection === "myinfo" ? "bg-blue-100 text-blue-700" : "text-gray-700"
                            }`}
                    >
                        My Info
                    </button>
                    <button
                        onClick={() => setCurrentSection("addbalance")}
                        className={`flex items-center px-4 py-2 w-full text-left rounded-md hover:bg-gray-100 ${currentSection === "addbalance" ? "bg-blue-100 text-blue-700" : "text-gray-700"
                            }`}
                    >
                        Add Balance
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-gray-700 px-4 py-2 w-full text-left rounded-md hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {currentSection === "dashboard" && (
                    <div>
                        {/* Dashboard Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-yellow-300 rounded-full"></div>
                                    <p className="text-sm font-medium">Adam Jackson</p>
                                </div>
                            </div>
                        </div>

                        {/* Main Balance */}
                        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md w-96 h-48">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-medium">Main Balance</h2>
                                    <div className="flex items-center justify-between">
                                        <p className="text-3xl font-bold py-4">
                                            $88,455.12
                                        </p>
                                        
                                            

                                    </div>

                                </div>
                                
                            </div>
                        </div>


                        {/* Transaction History */}
                        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction History</h2>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-600">
                                        <th className="px-4 py-2">Transaction ID</th>
                                        <th className="px-4 py-2">Amount</th>
                                        <th className="px-4 py-2">Date</th>
                                        <th className="px-4 py-2">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactionHistory.map((txn, index) => (
                                        <tr
                                            key={index}
                                            className="border-t hover:bg-gray-100"
                                        >
                                            <td className="px-4 py-2">{txn.id}</td>
                                            <td className="px-4 py-2">{txn.amount}</td>
                                            <td className="px-4 py-2">{txn.date}</td>
                                            <td className="px-4 py-2">{txn.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {currentSection === "myinfo" && (
                    <div className="bg-gray-100 p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
                        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
                            {/* Name Section */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5.121 17.804A11.953 11.953 0 0112 15c2.28 0 4.396.633 6.122 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-medium text-gray-600">
                                        <span className="font-bold text-gray-800">Name:</span> Adam Jackson
                                    </p>
                                </div>
                                <div className="flex items-center bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm font-medium">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Verified
                                </div>
                            </div>

                            {/* Account Number Section */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 01-8 0M12 15v5m-6-6a6 6 0 1112 0v1a2 2 0 01-2 2H6a2 2 0 01-2-2v-1z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-medium text-gray-600">
                                        <span className="font-bold text-gray-800">Account No:</span> 12345678
                                    </p>
                                </div>
                                <button className="text-blue-500 font-medium hover:underline text-sm">
                                    View Details
                                </button>
                            </div>

                            {/* Secret Key Section */}
                            <div className="flex items-center">
                                <div className="flex items-center space-x-4 flex-1">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 11c1.656 0 3-1.343 3-3S13.656 5 12 5s-3 1.343-3 3 1.344 3 3 3zm0 1c-4 0-7 1.791-7 4v1h14v-1c0-2.209-3-4-7-4z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-medium text-gray-600 flex items-center">
                                        <span className="font-bold text-gray-800">Secret Key:</span>
                                        {editingKey ? (
                                            <input
                                                type="text"
                                                value={secretKey}
                                                onChange={(e) => setSecretKey(e.target.value)}
                                                className="ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            <span className="ml-2 text-gray-800">{secretKey}</span>
                                        )}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setEditingKey(!editingKey)}
                                    className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm flex items-center space-x-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12h2m-6 0h2M12 15v2m0-10v2"
                                        />
                                    </svg>
                                    <span>{editingKey ? "Save" : "Edit"}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                )}

                {currentSection === "addbalance" && (
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Add Balance</h1>
                        <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
                            <p className="text-lg font-medium text-gray-600">Add money to your account:</p>
                            <input
                                type="number"
                                placeholder="Enter amount"
                                className="mt-4 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleAddBalance}
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Add Balance
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
