import React, { useState } from 'react';
import Navbar from './components/Navbar';

const Product = () => {
    const [selectedImage, setSelectedImage] = useState('images/image-product-1.jpg');
    const [quantity, setQuantity] = useState(1);

    const product = {
        name: 'Greeny Wooden Arm Chair',
        description: 'Accent Chair Living Room Armchair Tub Side Chair Sofa Lounge Soft Velvet Upholstered Back for Dining Room/Cafe Home Furniture',
        price: 399,
        originalPrice: 465,
        reviews: [
            { name: 'John Doe', rating: 4.5, comment: 'Very comfortable ' },
            { name: 'Jane Smith', rating: 5, comment: 'Looks amazing in my living room.' },
            { name: 'John Doe', rating: 4.5, comment: 'Very comfortable ' },
            { name: 'Jane Smith', rating: 5, comment: 'Looks amazing in my living room.' },
            { name: 'John Doe', rating: 4.5, comment: 'Very comfortable ' },
            { name: 'Jane Smith', rating: 5, comment: 'Looks amazing in my living room.' },
            { name: 'John Doe', rating: 4.5, comment: 'Very comfortable ' },
            { name: 'Jane Smith', rating: 5, comment: 'Looks amazing in my living room.' },
            { name: 'John Doe', rating: 4.5, comment: 'Very comfortable ' },
            { name: 'Jane Smith', rating: 5, comment: 'Looks amazing in my living room.' }
            // Add more reviews...
        ],
    };

    const handleImageChange = (newImageUrl) => {
        setSelectedImage(newImageUrl);
    };

    const handleIncrease = () => {
        if (quantity < 10) setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) setQuantity(prevQuantity => prevQuantity - 1);
    };

    return (
        <>
            <div className="flex flex-col navbar-fixed">
                <Navbar />
                <div className="flex flex-grow ">
                    {/* Left Section - Image */}
                    <div className="w-1/2 p-5 ">
                        {/* Fixed height container */}
                        <div className="w-full h-96 bg-gray-100 flex items-center justify-center ">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="object-contain w-full h-full"
                            />
                        </div>
                        {/* Image Selection */}
                        <div className="mt-5 flex space-x-3">
                            <button
                                onClick={() => handleImageChange('images/image-product-1.jpg')}
                                className="w-20 h-20 bg-gray-200"
                            >
                                <img
                                    src="images/image-product-1.jpg"
                                    alt="Thumbnail 1"
                                    className="object-cover w-full h-full"
                                />
                            </button>
                            <button
                                onClick={() => handleImageChange('images/image-product-2.jpg')}
                                className="w-20 h-20 bg-gray-200"
                            >
                                <img
                                    src="images/image-product-2.jpg"
                                    alt="Thumbnail 2"
                                    className="object-cover w-full h-full"
                                />
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Product Details */}
                    <div className="w-1/2 p-5 h-screen overflow-y-auto scrollbar-hide">
                        <h1 className="text-4xl font-bold mb-8">{product.name}</h1>
                        <h2 className="text-slate-600 text-sm font-semibold mb-1">Description</h2>
                        <p className="text-base mb-8">{product.description}</p>

                        <p className="text-2xl font-semibold">
                            Tk:{product.price}{' '}
                            <span className="text-gray-400 line-through">Tk{product.originalPrice}</span>
                        </p>

                        {/* Quantity Selection */}
                        <div className='flex flex-row space-x-10'>
                            <div className="flex items-center mt-5 space-x-4">
                                <label className="mr-2">Quantity:</label>

                                <button
                                    onClick={handleDecrease}
                                    className="px-4 py-2 bg-gray-200 rounded-md text-lg font-bold text-gray-600"
                                    disabled={quantity === 0}
                                >
                                    -
                                </button>

                                <div className="text-lg font-semibold">{quantity}</div>

                                <button
                                    onClick={handleIncrease}
                                    className="px-4 py-2 bg-gray-200 rounded-md text-lg font-bold text-gray-600"
                                    disabled={quantity === 10}
                                >
                                    +
                                </button>
                            </div>

                            <button className="bg-indigo-600 text-white rounded-md py-2 px-5 mt-5 hover:bg-indigo-500">
                                Add to Cart
                            </button>
                        </div>

                        {/* Reviews Section */}
                        <div className="mt-10">
                            <h3 className="text-xl font-bold mb-3">Reviews</h3>
                            <div className="space-y-3">
                                {product.reviews.map((review, index) => (
                                    <div key={index} className="border-b pb-2">
                                        <h4 className="font-semibold">{review.name}</h4>
                                        <p className="text-yellow-500">{review.rating}★</p>
                                        <p>{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
