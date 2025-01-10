import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import BankAccountDialog from './components/BankAccountDialog';

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [newPrice, setNewPrice] = useState('');

    useEffect(() => {
        const isAdd = localStorage.getItem('isAdd') === 'true'; // Convert to boolean
        const userId = localStorage.getItem('userId');
        console.log(userId);
        if (!isAdd) {
            setIsDialogOpen(true);
        }

        // Fetch products from the API
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/profile/supplier/${userId}`);
                const data = await response.json();
                // Assuming the API returns a structure similar to your example:
                if (data && data.supplierProducts) {
                    const allProducts = data.supplierProducts.flatMap(supplierProduct =>
                        supplierProduct.product_list.map(product => ({
                            ...product,
                            supplierId: supplierProduct.supplier_id,
                            tranUrl: supplierProduct.tran_url,
                        }))
                    );
                    setProducts(allProducts); // Update products state with fetched data
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();  // Call the fetch function
    }, []);
    
    const handleDialogClose = () => {
        setIsDialogOpen(false);
        // Optionally update local storage to reflect the user has completed the setup
        localStorage.setItem('isAdd', 'true');
    };

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
                    <button onClick={() => setIsModalOpen(true)} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
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
                    {/* Modal content here */}
                </Modal>

                <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                    {/* Edit modal content here */}
                </Modal>
            </div>
            {isDialogOpen && (
                <BankAccountDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
            )}
        </>
    );
};

export default SupplierDashboard;
