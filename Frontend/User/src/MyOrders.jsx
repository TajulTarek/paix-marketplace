import React from 'react';
import Navbar from './components/Navbar';

const orders = [
    { id: '1001', transactionId: 'TRX001', items: ['T-shirt', 'Jeans'], status: 'delivered' },
    { id: '1002', transactionId: 'TRX002', items: ['Sneakers'], status: 'pending' },
    { id: '1003', transactionId: 'TRX003', items: ['Hoodie', 'Socks', 'Cap'], status: 'delivered' },
    { id: '1004', transactionId: 'TRX004', items: ['Dress', 'Scarf'], status: 'pending' },
];

const StatusBadge = ({ status }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
);

export default function MyOrders() {
    return (
        <div className="container mx-auto px-20 py-8">
            <Navbar />
            <h1 className="text-2xl font-bold mb-10 "></h1>
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered Items</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.transactionId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <ul className="list-disc list-inside">
                                        {order.items.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status={order.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

