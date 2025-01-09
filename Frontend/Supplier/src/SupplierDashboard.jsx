import React, { useState } from 'react';
import Navbar from './components/Navbar';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '500px',
                width: '100%',
                position: 'relative'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    border: 'none',
                    background: 'none',
                    fontSize: '18px',
                    cursor: 'pointer'
                }}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

const SupplierDashboard = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1', price: 19.99, description: 'Description 1', quantity: 100, image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp' },
        { id: 2, name: 'Product 2', price: 29.99, description: 'Description 2', quantity: 50, image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp' },
        { id: 3, name: 'Product 3', price: 39.99, description: 'Description 3', quantity: 75, image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp' },
    ]);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        quantity: '',
        image: null,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [newPrice, setNewPrice] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewProduct({ ...newProduct, image: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProductWithId = {
            ...newProduct,
            id: products.length + 1,
            image: newProduct.image ? URL.createObjectURL(newProduct.image) : '/placeholder.svg',
        };
        setProducts([...products, newProductWithId]);
        setNewProduct({ name: '', price: '', description: '', quantity: '', image: null });
        setIsModalOpen(false);
    };

    const handleEditPrice = (product) => {
        setCurrentProduct(product);
        setNewPrice(product.price);
        setIsEditModalOpen(true);
    };

    const handlePriceUpdate = (e) => {
        e.preventDefault();
        setProducts(products.map(product =>
            product.id === currentProduct.id ? { ...product, price: parseFloat(newPrice) } : product
        ));
        setIsEditModalOpen(false);
    };

    return (
        <>
            <Navbar />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', paddingTop: '80px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Supplier Dashboard</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            padding: '12px 24px',
                            background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                            transition: 'background 0.3s, transform 0.1s, box-shadow 0.3s',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            WebkitBoxShadow: '0px 0px 15px -2px rgba(0, 0, 0, 0.2)',
                            MozBoxShadow: '0px 0px 15px -2px rgba(0, 0, 0, 0.2)',
                            boxShadow: '0px 0px 15px -2px rgba(0, 0, 0, 0.2)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.4)';
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, #5c1aca, #2f4bff)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, #6a11cb, #2575fc)';
                        }}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Add New Product
                    </button>
                </div>

                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Your Products</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee' }}>
                                <th style={{ textAlign: 'left', padding: '12px' }}>Image</th>
                                <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
                                <th style={{ textAlign: 'left', padding: '12px' }}>Price</th>
                                <th style={{ textAlign: 'left', padding: '12px' }}>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>
                                        <img src={product.image} alt={product.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </td>
                                    <td style={{ padding: '12px' }}>{product.name}</td>
                                    <td style={{ padding: '12px', position: 'relative' }} className="price-cell">
                                        ${product.price}
                                        <button
                                            onClick={() => handleEditPrice(product)}
                                            style={{
                                                marginLeft: '10px',
                                                padding: '4px 8px',
                                                backgroundColor: '#f0f0f0',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '12px',
                                                position: 'absolute',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                // display: 'none', // Initially hidden
                                            }}
                                            className="edit-button"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td style={{ padding: '12px' }}>{product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Add New Product</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label htmlFor="name" style={{ display: 'block', marginBottom: '4px' }}>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="price" style={{ display: 'block', marginBottom: '4px' }}>Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                required
                                min="0"
                                step="0.01"
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="description" style={{ display: 'block', marginBottom: '4px' }}>Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '100px' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity" style={{ display: 'block', marginBottom: '4px' }}>Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={newProduct.quantity}
                                onChange={handleInputChange}
                                required
                                min="0"
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="image" style={{ display: 'block', marginBottom: '4px' }}>Product Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Add Product
                            </button>
                        </div>
                    </form>
                </Modal>

                <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Edit Price</h2>
                    <form onSubmit={handlePriceUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label htmlFor="currentPrice" style={{ display: 'block', marginBottom: '4px' }}>Current Price</label>
                            <input
                                type="text"
                                id="currentPrice"   
                                value={`$${currentProduct?.price}`}
                                readOnly
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f0f0f0' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="newPrice" style={{ display: 'block', marginBottom: '4px' }}>New Price</label>
                            <input
                                type="number"
                                id="newPrice"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                required
                                min="0"
                                step="0.01"
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setIsEditModalOpen(false)}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px', // More rounded corners
                                    cursor: 'pointer',
                                    fontSize: '12px', // Larger font size
                                  
                                    transition: 'background-color 0.3s, transform 0.2s',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#d32f2f'; // Darker red on hover
                                    e.currentTarget.style.transform = 'scale(1.05)'; // Slightly larger on hover
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f44336';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                style={{
                                    padding: '10px 20px',
                                    background: 'linear-gradient(135deg, #4CAF50, #66BB6A)', // Gradient background
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px', // More rounded corners
                                    cursor: 'pointer',
                                    fontSize: '12px', // Larger font size
                                  
                                    transition: 'background 0.3s, transform 0.2s',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #388E3C, #43A047)'; // Darker gradient on hover
                                    e.currentTarget.style.transform = 'scale(1.05)'; // Slightly larger on hover
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                Update Price
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
};

export default SupplierDashboard;