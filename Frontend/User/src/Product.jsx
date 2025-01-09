import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
    const { productId } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/product/${productId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.product) {
                        setProduct(data.product);
                        setSelectedImage(data.product.image); // Set the product image as the default selected image
                    } else {
                        toast.error('Product not found.');
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
    }, [productId]);

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

        const userId = localStorage.getItem("userId"); // Replace with actual user ID retrieval logic

        const cartItem = {
            user_id: userId,
            product_id: product._id,
            product_name: product.name,
            supplier_id: product.supplier_id,
            price: product.price,
            quantity: quantity
        };

        try {
            const response = await fetch('http://localhost:8000/product/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItem),
            });

            const data = await response.json();
            console.log('Response data:', data); // Log the response data for inspection

            if (response.ok) {
                // Adjust this logic based on the actual response structure
                if (data.success || data.message === 'Product added to cart successfully') {
                    toast.success('Product added to cart successfully!');
                } else {
                    toast.error('Failed to add product to cart. Please try again.');
                }
            } else {
                toast.error(`Failed to add product to cart: ${data.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Error adding product to cart. Please check your network connection.');
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