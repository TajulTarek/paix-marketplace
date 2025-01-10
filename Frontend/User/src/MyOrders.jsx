import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';

const StatusBadge = ({ isVerified }) => (
    <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}
    >
        {isVerified ? 'Verified' : 'Pending'}
    </span>
);

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = localStorage.getItem("userId"); // Replace with dynamic value if needed
                console.log(userId);
                const response = await fetch(`http://localhost:8000/profile/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setOrders(data.supplierProducts || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-20 py-8">
            <Navbar />
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction URL</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered Items</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <a
                                        href={order.tran_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Invoice
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <ul className="list-disc list-inside">
                                        {order.product_list.map((item) => (
                                            <li key={item._id}>
                                                {item.product_name} - {item.quantity} pcs @ ₹{item.price}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge isVerified={order.isVerified} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
