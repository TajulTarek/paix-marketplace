import React, { useState } from 'react';
import Navbar from './components/Navbar';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([{
        id: 1,
        name: 'Basic Tee',
        color: 'Sienna',
        size: 'Large',
        price: 32.00,
        quantity: 1,
        stockStatus: 'In stock',
        image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
    },
    {
        id: 2,
        name: 'Basic Tee',
        color: 'Black',
        size: 'Large',
        price: 32.00,
        quantity: 1,
        stockStatus: 'Ships in 3–4 weeks',
        image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    },
    {
        id: 3,
        name: 'Nomad Tumbler',
        color: 'White',
        size: '1',
        price: 35.00,
        quantity: 1,
        stockStatus: 'In stock',
        image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    },
    {
        id: 3,
        name: 'Nomad Tumbler',
        color: 'White',
        size: '1',
        price: 35.00,
        quantity: 1,
        stockStatus: 'In stock',
        image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    },
    {
        id: 3,
        name: 'Nomad Tumbler',
        color: 'White',
        size: '1',
        price: 35.00,
        quantity: 1,
        stockStatus: 'In stock',
        image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    },
    {
        id: 3,
        name: 'Nomad Tumbler',
        color: 'White',
        size: '1',
        price: 35.00,
        quantity: 1,
        stockStatus: 'In stock',
        image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    },
    {
        id: 3,
        name: 'Nomad Tumbler',
        color: 'White',
        size: '1',
        price: 35.00,
        quantity: 1,
        stockStatus: 'In stock',
        image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    }
    ]);

    const [balance, setBalance] = useState(50.00); // Example balance
    const [showModal, setShowModal] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [addresses, setAddresses] = useState([
        // Example addresses
        { id: 1, address: '123 Main St, Springfield' },
        { id: 2, address: '456 Elm St, Springfield' }
    ]);
    const [selectedAddressId, setSelectedAddressId] = useState(1);
    const [newAddress, setNewAddress] = useState('');

    const handleQuantityChange = (id, newQuantity) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
    };

    const handleRemoveItem = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    const shippingEstimate = 5.00;
    const taxEstimate = 8.32;
    const total = (parseFloat(calculateSubtotal()) + shippingEstimate + taxEstimate).toFixed(2);

    const handleCheckout = () => {
        if (balance < parseFloat(total)) {
            setShowWarning(true);
        } else {
            setShowModal(true);
        }
    };

    const handleConfirmOrder = () => {
        // Handle the order confirmation logic here
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseWarning = () => {
        setShowWarning(false);
    };

    const handleAddressChange = () => {
        setShowAddressModal(true);
    };

    const handleCloseAddressModal = () => {
        setShowAddressModal(false);
    };

    const handleSelectAddress = (id) => {
        setSelectedAddressId(id);
    };

    const handleAddAddress = () => {
        if (newAddress.trim()) {
            setAddresses([...addresses, { id: addresses.length + 1, address: newAddress }]);
            setNewAddress('');
            handleCloseAddressModal();
        }
    };

    return (
        <>
            {/* Navbar */}
            <div className="navbar-fixed">
                <Navbar />
            </div>
            <div className="bg-gray-50 min-h-screen p-8 pt-20">
                <div className="max-w-7xl mx-auto">
                    {/* Shopping Cart Header */}
                    <h1 className="text-3xl font-bold mb-8">My Cart</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:grid-row-2">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4 overflow-y-auto h-[545px] lg:row-span-2 scrollbar-hide">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow">
                                    {/* Product Image */}
                                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <div>
                                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                                <p className="text-gray-500">{item.color}</p>
                                                <p className="text-gray-500">Size: {item.size}</p>
                                                <p className="text-gray-900 mt-1">${item.price.toFixed(2)}</p>
                                            </div>
                                            {/* Remove Button */}
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="text-red-500 hover:text-red-700 font-bold text-lg"
                                            >
                                                &times;
                                            </button>
                                        </div>

                                        {/* Stock Status */}
                                        <p className="text-sm text-gray-500 mt-2">{item.stockStatus}</p>

                                        {/* Quantity Selector */}
                                        <div className="mt-4">
                                            <label className="block text-gray-700">Quantity</label>
                                            <select
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                                className="border rounded-md p-2 w-20"
                                            >
                                                {[...Array(10).keys()].map(n => (
                                                    <option key={n + 1} value={n + 1}>
                                                        {n + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white p-6 rounded-lg shadow sticky-summary">
                            <h2 className="text-lg font-bold mb-6">Order summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span>${calculateSubtotal()}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>
                                        Shipping estimate{' '}
                                        <span className="text-gray-400">
                                            <button className="cursor-help">?</button>
                                        </span>
                                    </span>
                                    <span>${shippingEstimate.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>
                                        Tax estimate{' '}
                                        <span className="text-gray-400">
                                            <button className="cursor-help">?</button>
                                        </span>
                                    </span>
                                    <span>${taxEstimate.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-900 font-bold">
                                    <span>Order total</span>
                                    <span>${total}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-900 font-semibold">Delivery Address</span>
                                    <button
                                        onClick={handleAddressChange}
                                        className="text-indigo-600 hover:text-indigo-800"
                                    >
                                        Change Address
                                    </button>
                                </div>
                                <p className="text-gray-700 mt-2">
                                    {addresses.find(address => address.id === selectedAddressId)?.address || 'Select an address'}
                                </p>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-indigo-600 text-white py-2 px-4 mt-6 rounded-lg hover:bg-indigo-500"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Warning Modal */}
            {showWarning && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-bold mb-4">Insufficient Balance</h2>
                        <p>Your balance is insufficient to complete this purchase.</p>
                        <button
                            onClick={handleCloseWarning}
                            className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-bold mb-4">Confirm Order</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal</span>
                                <span>${calculateSubtotal()}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Shipping estimate</span>
                                <span>${shippingEstimate.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Tax estimate</span>
                                <span>${taxEstimate.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-900 font-bold">
                                <span>Order total</span>
                                <span>${total}</span>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-900 font-semibold">Delivery Address</span>
                                    <p className="text-gray-700">
                                        {addresses.find(address => address.id === selectedAddressId)?.address || 'Select an address'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={handleConfirmOrder}
                                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Address Selection Modal */}
            {showAddressModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-bold mb-4">Select Delivery Address</h2>
                        <div className="space-y-4">
                            {addresses.map(address => (
                                <div key={address.id} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id={`address-${address.id}`}
                                        name="address"
                                        value={address.id}
                                        checked={selectedAddressId === address.id}
                                        onChange={() => handleSelectAddress(address.id)}
                                        className="form-radio"
                                    />
                                    <label htmlFor={`address-${address.id}`} className="text-gray-700">
                                        {address.address}
                                    </label>
                                </div>
                            ))}
                            <div className="mt-4">
                                <label htmlFor="new-address" className="block text-gray-700">Add New Address</label>
                                <input
                                    id="new-address"
                                    type="text"
                                    value={newAddress}
                                    onChange={(e) => setNewAddress(e.target.value)}
                                    className="border rounded-md p-2 w-full mt-2"
                                    placeholder="House No, Road No, R/A, City"
                                />
                                <button
                                    onClick={handleAddAddress}
                                    className="w-full bg-indigo-600 text-white py-2 px-4 mt-2 rounded-lg hover:bg-indigo-500"
                                >
                                    Add Address
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={handleCloseAddressModal}
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShoppingCart;

