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
            justifyContent: 'center'
        }}>
            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '500px',
                width: '100%'
            }}>
                <button onClick={onClose} style={{
                    float: 'right',
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
        { id: 1, name: 'Product 1', price: 19.99, description: 'Description 1', quantity: 100, image: '/placeholder.svg' },
        { id: 2, name: 'Product 2', price: 29.99, description: 'Description 2', quantity: 50, image: '/placeholder.svg' },
        { id: 3, name: 'Product 3', price: 39.99, description: 'Description 3', quantity: 75, image: '/placeholder.svg' },
    ]);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        quantity: '',
        image: null,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    return (
        <>
            <Navbar/>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Supplier Dashboard</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
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
                                <td style={{ padding: '12px' }}>${product.price}</td>
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
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            alignSelf: 'flex-start'
                        }}
                    >
                        Add Product
                    </button>
                </form>
            </Modal>
            </div>
            </>
    );
};

export default SupplierDashboard;