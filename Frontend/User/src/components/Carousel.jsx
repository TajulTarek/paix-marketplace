import React, { useState, useEffect } from 'react';
import coverImage from '../assets/cover2.png';

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        coverImage,
        coverImage,
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
        "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
    ];

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
    };

    // Automatically go to the next slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // 3000 ms = 3 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [currentSlide]);

    // Handle click on slide
    const handleSlideClick = (index) => {
        console.log(`Clicked on slide ${index + 1}`);
        // You can also trigger navigation or other actions here
    };

    return (
        <div className='px-20 py-6'>
        <div className="carousel w-full relative overflow-hidden">
            <div
                className="carousel-inner flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0 cursor-pointer h-96"
                        onClick={() => handleSlideClick(index)} // Click event handler
                    >
                        <img
                            src={slide}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full"
                        />
                    </div>
                ))}
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <button onClick={prevSlide} className="btn btn-circle">❮</button>
                <button onClick={nextSlide} className="btn btn-circle">❯</button>
            </div>
        </div>
        </div>
    );
}

export default Carousel;
