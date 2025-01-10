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
    const [transactionId, setTransactionId] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const handleRequestMoney = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleAcceptProduct = () => {
        console.log(`Requesting money for order ${selectedOrder.id}`);
        console.log(`Transaction ID: ${transactionId}, Secret Key: ${secretKey}`);
        setIsModalOpen(false);
    };

    const handleSummaryClick = (orderId) => {
        // This function should handle opening of the PDF summary.
        console.log(`Opening PDF summary for order ${orderId}`);
        window.open(`/path/to/pdf/order-summary-${orderId}.pdf`, '_blank');
    };

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-6 bg-zinc-100">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Orders</h1>

                <div className="flex justify-between items-center mb-6">
                    <a
                        href="/"
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
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Summary</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b">
                                    <td className="px-6 py-4 text-gray-800">
                                        Order {order.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleSummaryClick(order.id)}
                                            className="text-blue-500 underline hover:text-blue-700"
                                        >
                                            View Summary
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
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {isModalOpen && selectedOrder && (
                    <>
                        <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsModalOpen(false)}></div>
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-60"> {/* Setting a higher z-index */}
                                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                                <p className="mb-4">Order ID: {selectedOrder.id}</p>
                                <p className="mb-4">Amount: ${selectedOrder.amount}</p>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                                    <input
                                        type="text"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        placeholder="Enter transaction ID"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                                    <input
                                        type="password"
                                        value={secretKey}
                                        onChange={(e) => setSecretKey(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        placeholder="Enter secret key"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAcceptProduct}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Orders;