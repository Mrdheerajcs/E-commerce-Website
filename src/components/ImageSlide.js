import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FcPrevious, FcNext } from "react-icons/fc";

const ImageSlide = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Fetch slides from the backend
    const fetchSlides = async () => {
        try {
            const response = await axios.get('http://localhost:8082/slidesMaster');
            setSlides(response.data);
        } catch (error) {
            console.error('Error fetching slides:', error);
        }
    };

    // Next slide
    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    // Previous slide
    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    // Go to a specific slide
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };


    useEffect(() => {
        fetchSlides(); 
        const interval = setInterval(() => {
            if (slides.length > 0) {
                nextSlide(); 
            }
        }, 2000); 
        return () => clearInterval(interval); 
    }, [slides.length]);

    return (
        <div className="relative overflow-hidden mt-2 rounded-lg bg-gray-300">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="w-full flex-shrink-0 flex h-80 sm:h-[450px]"
                        style={{ backgroundColor: slide.backgroundColor || 'transparent' }} // Apply background color
                    >
                        <div className="w-1/2 flex flex-col justify-center p-6 ml-32">
                            {slide.title && (
                                <h1 className="text-4xl sm:text-6xl font-bold mb-2 sm:mb-4">
                                    {slide.title}
                                </h1>
                            )}

                            {slide.description && (
                                <p className="text-2xl sm:text-3xl mb-4">
                                    {slide.description}
                                </p>
                            )}
                            {slide.buttonName && (
                                <a
                                    href={slide.buttonLink}
                                    className="flex items-center justify-center w-24 mt-3 rounded-md px-2 py-3 sm:w-40"
                                    style={{ backgroundColor: slide.buttonColor }}
                                >
                                    <span className="text-white text-xs sm:text-base">{slide.buttonName}</span>
                                </a>
                            )}
                        </div>
                        <div className="w-1/2 flex items-center justify-center">
                            <img
                                src={slide.imageSrc}
                                alt={`Slide ${slide.id}`}
                                className="w-[430] h-[400] object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-1.5 py-2 z-10"
            >
                <FcPrevious />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-1.5 py-2 z-10"
            >
                <FcNext />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-500'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageSlide;
