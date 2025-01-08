import React, { useState } from 'react';
import Navbar from './components/Navbar';

const Product = () => {
    const [selectedImage, setSelectedImage] = useState('images/image-product-1.jpg');
    const [quantity, setQuantity] = useState(1);

    const product = {
        name: 'Greeny Wooden Arm Chair',
        supplier: 'Furniture Co.',
        description: ' Accent Chair Living Room Armchair Tub Side Chair Sofa Lounge Soft Velvet Upholstered Back for Dining Room/Cafe Home Furniture Accent Chair Living Room Armchair Tub Side Chair SoAccent Chair Living Room Armchair Tub Side Chair Sofa Lounge Soft Velvet Upholstered Back for Dining Room/Cafe Home FurnitureAccent Chair Living Room Armchair Tub Side Chair Sofa Lounge Soft Velvet Upholstered Back for Dining Room/Cafe Home FurnitureAccent Chair Living Room Armchair Tub Side Chair Sofa Lounge Soft Velvet Upholstered Back for Dining Room/Cafe Home FurnitureAccent Chair Living Room Armchair Tub Side Chair Sofa Lounge Soft Velvet Upholstered Back for Dining Room/Cafe Home FurnitureAccent Chair Living Room Armchair Tub Side Chair Sofa Lounge Soft Velvet Upholstered Back for Dining Room/Cafe Home Furniturefa Lounge Soft Velvet Upholstered Back for Dining Room/Cafe Home Furniture',
        price: 399,
        originalPrice: 465,
        images: [
            'images/image-product-1.jpg',
            'images/image-product-2.jpg',
        ],
    };

    const handleImageChange = (newImageUrl) => {
        setSelectedImage(newImageUrl);
    };

    const handleIncrease = () => {
        if (quantity < 10) setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) setQuantity((prevQuantity) => prevQuantity - 1);
    };
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };
    
    return (
        <>
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
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleImageChange(image)}
                                    className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden border hover:border-indigo-500"
                                >
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="object-cover w-full h-full"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Section - Product Details */}
                    <div className="w-full md:w-1/2 p-5 bg-white rounded-md shadow-lg md:pt-16">
                        <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name}</h1>
                        <p className="text-sm text-gray-500 mb-4">Supplier: {product.supplier}</p>
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
                            <button className="bg-indigo-600 text-white rounded-md py-2 px-6 font-semibold hover:bg-indigo-500">
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
