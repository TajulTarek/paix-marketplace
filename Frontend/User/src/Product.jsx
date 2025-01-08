import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch('http://localhost:8000/product');
                if (response.ok) {
                    const data = await response.json();
                    if (data.products && data.products.length > 0) {
                        const productData = data.products[0]; // Assuming you want the first product
                        setProduct(productData);
                        setSelectedImage(productData.image); // Set the product image as the default selected image
                    } else {
                        toast.error('No products found.');
                    }
                } else {
                    console.error('Failed to fetch product data:', response.statusText);
                    toast.error('Failed to fetch product data.');
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
                toast.error('Error fetching product data.');
            }
        };

        fetchProductData();
    }, []);

    const handleImageChange = (newImageUrl) => {
        setSelectedImage(newImageUrl);
    };

    const handleIncrease = () => {
        if (quantity < 10) setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) setQuantity((prevQuantity) => prevQuantity - 1);
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleAddToCart = async () => {
        if (!product) return;

        const cartItem = {
            name: product.name,
            description: product.description,
            supplier_id: product.supplier_id,
            supplier_name: product.supplier_name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: selectedImage
        };

        try {
            const response = await fetch('http://localhost:8000/product/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItem),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Product added to cart successfully!');
                console.log('Product added to cart:', data);
            } else {
                console.error('Failed to add product to cart:', response.statusText);
                toast.error('Failed to add product to cart.');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Error adding product to cart.');
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex flex-grow flex-col md:flex-row p-5 md:p-10">
                    {/* Left Section - Image */}
                    <div className="w-full md:w-1/2 p-5 md:pt-24">
                        <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-md shadow-sm">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="object-contain w-full h-full rounded-md"
                            />
                        </div>
                        {/* Image Thumbnails */}
                        <div className="mt-5 flex space-x-3">
                            <button
                                onClick={() => handleImageChange(product.image)}
                                className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden border hover:border-indigo-500"
                            >
                                <img
                                    src={product.image}
                                    alt="Thumbnail"
                                    className="object-cover w-full h-full"
                                />
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Product Details */}
                    <div className="w-full md:w-1/2 p-5 bg-white rounded-md shadow-lg md:pt-16">
                        <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name}</h1>
                        <p className="text-sm text-gray-500 mb-4">Supplier: {product.supplier_name}</p>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
                        <div className={`text-gray-600 mb-4 ${showFullDescription ? '' : 'max-h-20 overflow-hidden relative'}`}>
                            <p>{product.description}</p>
                            {!showFullDescription && (
                                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
                            )}
                        </div>
                        <button
                            onClick={toggleDescription}
                            className="text-gray-600 hover:underline"
                        >
                            {showFullDescription ? 'See Less' : 'See More'}
                        </button>

                        <p className="text-2xl font-bold text-indigo-600 mb-4">
                            Tk {product.price}{' '}
                            <span className="text-gray-400 line-through text-lg">Tk {product.originalPrice}</span>
                        </p>

                        <div className="flex items-center space-x-6 mb-6">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={handleDecrease}
                                    className={`px-4 py-2 bg-gray-200 rounded-md text-lg font-bold text-gray-600 hover:bg-gray-300 ${quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={quantity === 0}
                                >
                                    -
                                </button>
                                <div className="text-lg font-semibold">{quantity}</div>
                                <button
                                    onClick={handleIncrease}
                                    className={`px-4 py-2 bg-gray-200 rounded-md text-lg font-bold text-gray-600 hover:bg-gray-300 ${quantity === 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={quantity === 10}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="bg-indigo-600 text-white rounded-md py-2 px-6 font-semibold hover:bg-indigo-500"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;