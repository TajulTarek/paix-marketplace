import React from 'react';
import { Link } from 'react-router-dom';

function Productlist() {
    const products = [
        {
            id: 1,
            title: 'Shoes!',
            description: 'If a dog chews shoes whose shoes does he choose?',
            imageUrl: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
            badges: ['Fashion', 'Products'],
            isNew: true
        },
        {
            id: 2,
            title: 'Burger',
            description: 'Delicious burger with fresh ingredients.',
            imageUrl: 'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
            badges: ['Food', 'Fast Food'],
            isNew: false
        },
        {
            id: 3,
            title: 'Burger Deluxe',
            description: 'A deluxe burger packed with flavor.',
            imageUrl: 'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
            badges: ['Food', 'Premium'],
            isNew: false
        },
        // Add more products...
    ];

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
                    <Link to='/product' key={product.id} className="card bg-base-100 w-80 h-96 shadow-sm transform transition-transform duration-300 hover:scale-105 mx-2 border border-gray-300">
                        <div className="card bg-base-100 w-80 h-96 shadow-sm rounded-none">
                            <figure>
                                <img src={product.imageUrl} alt={product.title} className="rounded-sm h-48 w-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {product.title}
                                    {product.isNew && <div className="badge badge-secondary">NEW</div>}
                                </h2>
                                <p>{product.description}</p>
                                <div className="card-actions justify-end">
                                    {product.badges.map((badge, badgeIndex) => (
                                        <div key={badgeIndex} className="badge badge-outline">
                                            {badge}
                                        </div>
                                    ))}
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
