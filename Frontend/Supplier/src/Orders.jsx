import React, { useState } from 'react';
import Navbar from './components/Navbar';

const Orders = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            status: 'Pending',
            products: [
                { name: 'Product A', price: 50 },
                { name: 'Product B', price: 50 },
            ],
            amount: 100
        },
        {
            id: 2,
            status: 'Running',
            products: [
                { name: 'Product C', price: 25 },
                { name: 'Product D', price: 25 },
            ],
            amount: 50
        },
        {
            id: 3,
            status: 'Supplied',
            products: [
                { name: 'Product E', price: 75 }
            ],
            amount: 75
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [viewProductsOrder, setViewProductsOrder] = useState(null);

    const handleRequestMoney = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleAcceptProduct = () => {
        console.log(`Requesting money for order ${selectedOrder.id}`);
        setIsModalOpen(false);
    };

    const handleViewProducts = (order) => {
        setViewProductsOrder(viewProductsOrder === order.id ? null : order.id); // Toggle view
    };

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-6 bg-gray-100">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Orders</h1>

                <div className="flex justify-between items-center mb-6">
                    <a
                        href="/dashboard"
                        className="bg-green-500 text-white px-5 py-2 rounded-lg shadow hover:bg-green-600 transition"
                    >
                        Go to Products
                    </a>
                    <h2 className="text-xl font-medium text-gray-700">Order List</h2>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">OrderId</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Products</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <tr className="border-b">
                                        <td className="px-6 py-4 text-gray-800">
                                            Order {order.id}
                                            
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleViewProducts(order)}
                                                className="ml-4 text-blue-500 underline hover:text-blue-700"
                                            >
                                                {viewProductsOrder === order.id ? 'Hide Products' : 'View Products'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Pending'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : order.status === 'Running'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-green-100 text-green-700'
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-800">${order.amount}</td>
                                        <td className="px-6 py-4">
                                            {order.status === 'Pending' && (
                                                <button
                                                    onClick={() => handleRequestMoney(order)}
                                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
                                                >
                                                    Request Money
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                    {viewProductsOrder === order.id && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 bg-gray-50">
                                                <ul>
                                                    {order.products.map((product, index) => (
                                                        <li key={index} className="py-2">
                                                            {product.name} - ${product.price}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {isModalOpen && selectedOrder && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                            <p className="mb-4">Order ID: {selectedOrder.id}</p>
                            <p className="mb-4">Amount: ${selectedOrder.amount}</p>
                            <p className="mb-4">Products:</p>
                            <ul className="mb-4">
                                {selectedOrder.products.map((product, index) => (
                                    <li key={index} className="py-1">
                                        {product.name} - ${product.price}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleAcceptProduct}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                        <div className="fixed inset-0 bg-black opacity-0" onClick={() => setIsModalOpen(false)}></div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Orders;
