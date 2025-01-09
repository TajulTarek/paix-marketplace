import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Productlist() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/product');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.products);
                } else {
                    console.error('Failed to fetch products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='px-20 py-6'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold'>Best Deals</h2>
                <button className='btn btn-circle btn-sm bg-teal-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="carousel w-full space-x-4 h-96">
                {products.map((product) => (
                    <Link to={`/product/${product._id}`} key={product._id} className="card bg-base-100 w-80 h-96 shadow-sm transform transition-transform duration-300 hover:scale-105 mx-2 border border-gray-300">
                        <div className="card bg-base-100 w-80 h-96 shadow-sm rounded-none">
                            <figure>
                                <img src={product.image} alt={product.name} className="rounded-sm h-48 w-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {product.name}
                                    {/* Assuming you want to mark new products, you can add logic here if needed */}
                                </h2>
                                <p>{product.description}</p>
                                <div className="card-actions justify-end">
                                    {/* Assuming badges are not part of the API response, you can add static or dynamic badges here */}
                                    <div className="badge badge-outline">Fashion</div>
                                    <div className="badge badge-outline">Products</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Productlist;