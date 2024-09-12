import React, { useState } from 'react';
import Navbar from './components/Navbar';

const AdminDashboard = () => {

    const [activeTab, setActiveTab] = useState('users');

    const users = [
        
        { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3 },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', orders: 7 },
        { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3 },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', orders: 7 },
        { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3 },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', orders: 7 },
        { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3 },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', orders: 7 }
    ];

    const products = [
        { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', quantity: 50 },
        { id: 2, name: 'T-shirt', price: 19.99, category: 'Clothing', quantity: 200 },
        { id: 3, name: 'Coffee Maker', price: 49.99, category: 'Home & Kitchen', quantity: 75 },
    ];

    const pendingProducts = [
        { id: 1, name: 'Wireless Earbuds', price: 79.99, category: 'Electronics', sellerId: 'S001' },
        { id: 2, name: 'Yoga Mat', price: 29.99, category: 'Sports & Outdoors', sellerId: 'S002' },
        { id: 3, name: 'Blender', price: 39.99, category: 'Home & Kitchen', sellerId: 'S003' },
    ];

    const handleApproveProduct = (productId) => {
        console.log(`Approved product with ID: ${productId}`);
        // Here you would typically send an API request to approve the product
    };

    return (
        <>
            <Navbar/>
            <div className="flex h-[640px] bg-gray-100 mt-20 px-8">
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-md">
                    <div className="p-4">
                        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    </div>
                    <nav className="mt-4">
                        {['users', 'products', 'pending-products'].map((tab) => (
                            <button
                                key={tab}
                                className={`w-full text-left px-4 py-2 ${activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                            </button>
                        ))}
                    </nav>
                </div>
                {/* Main content */}
                <div className="flex-1 p-8 overflow-auto scrollbar-hide">
                    {activeTab === 'users' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Users</h2>
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-200">
                                    <tr>
                                        {['ID', 'Name', 'Email', 'Orders'].map((header) => (
                                            <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            {Object.values(user).map((value, index) => (
                                                <td key={index} className="px-6 py-4 whitespace-nowrap">
                                                    {value}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Products</h2>
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-200">
                                    <tr>
                                        {['ID', 'Name', 'Price', 'Category', 'Quantity'].map((header) => (
                                            <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'pending-products' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Pending Products</h2>
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-200">
                                    <tr>
                                        {['ID', 'Name', 'Price', 'Category', 'Seller ID', 'Action'].map((header) => (
                                            <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {pendingProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.sellerId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleApproveProduct(product.id)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
                                                >
                                                    Approve
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;