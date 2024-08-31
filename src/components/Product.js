import React, { useState } from 'react';
import { IoChevronUpSharp, IoChevronDownOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";

const Product = () => {
    const [selectedImage, setSelectedImage] = useState("https://m.media-amazon.com/images/I/61nxQ62qglL._SX569_.jpg");
    const [startIndex, setStartIndex] = useState(0);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZooming, setIsZooming] = useState(false);

    const images = [
        "https://m.media-amazon.com/images/I/61nxQ62qglL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/51jCor3c-EL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/51WU-TWgRHL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/71rooC1PHHL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/51XPPYB66ZL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/51jCor3c-EL._SX569_.jpg",
        "https://rukminim2.flixcart.com/image/416/416/kdhphu80/mobile/k/d/9/samsung-note-20-canvas-sm-n986bzngins-original-imafudkvgxpjykjh.jpeg",
        "https://m.media-amazon.com/images/I/71rooC1PHHL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/71rooC1PHHL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/71rooC1PHHL._SX569_.jpg",
    ];

    const visibleImages = images.slice(startIndex, startIndex + 7);

    const handleScrollUp = () => {
        setStartIndex(prevIndex => Math.max(prevIndex - 7, 0));
    };

    const handleScrollDown = () => {
        setStartIndex(prevIndex => Math.min(prevIndex + 7, images.length - 7));
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setZoomPosition({ x, y });
    };

    const handleMouseEnter = () => {
        setIsZooming(true);
    };

    const handleMouseLeave = () => {
        setIsZooming(false);
    };

    return (
        <div className="flex justify-center bg-white p-5 w-11/12 mb-16">
            <div className="grid grid-cols-[40%_auto] gap-8 w-full">
                <div className="grid grid-rows-[auto_auto] gap-3 bg-white h-full">
                    <div className="grid grid-cols-[10%_auto] h-full">
                        <div className="relative">
                            {startIndex > 0 && (
                                <button
                                    className="absolute top-0 left-0 right-0 bg-white border border-gray-300 shadow-md hover:bg-gray-100 z-10"
                                    onClick={handleScrollUp}
                                >
                                    <IoChevronUpSharp className='text-black' />
                                </button>
                            )}
                            <div className="grid grid-rows-7 grid-flow-col pb-4 overflow-y-auto max-h-full">
                                {visibleImages.map((img, index) => (
                                    <img
                                        key={index}
                                        className="border border-gray-300 h-[62.8px] w-full object-cover hover:border-blue-600 cursor-pointer"
                                        src={img}
                                        alt={`Thumbnail ${index}`}
                                        onClick={() => setSelectedImage(img)}
                                    />
                                ))}
                            </div>
                            {startIndex < images.length - 7 && (
                                <button
                                    className="absolute bottom-0 left-0 right-0 bg-white border border-gray-300 shadow-md hover:bg-gray-100 z-10"
                                    onClick={handleScrollDown}
                                >
                                    <IoChevronDownOutline className='text-black' />
                                </button>
                            )}
                        </div>
                        <div className="flex items-center justify-center h-full">
                            <div
                                className="relative w-full h-full overflow-hidden border border-gray-300 bg-white"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{ cursor: isZooming ? 'zoom-in' : 'default' }}
                            >
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    className="w-full h-full object-contain"
                                />
                                {isZooming && (
                                    <div
                                        className="absolute w-[150px] h-[100px] border border-gray-400 bg-transparent"
                                        style={{
                                            left: `${zoomPosition.x}%`,
                                            top: `${zoomPosition.y}%`,
                                            transform: 'translate(-50%, -50%)',
                                            backgroundImage: `radial-gradient(circle, #9CA3AF 1px, transparent 1px)`,
                                            backgroundSize: `4px 4px`,
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        <GoPlus className="text-gray-950 text-4xl" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button className="w-full bg-blue-500 text-white py-2 rounded-md">Notify Me</button>
                        <p className="text-gray-500 text-center mt-1">Get notified when this item comes back in stock.</p>
                    </div>
                </div>

                <div className="relative bg-white w-full h-full overflow-y-auto">
                    <div className="overflow-y-auto max-h-[584.55px] p-4">
                        {isZooming && (
                            <div
                                className="absolute w-full h-full"
                                style={{
                                    backgroundImage: `url(${selectedImage})`,
                                    backgroundSize: '200%',
                                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                    border: '2px solid #ccc',
                                    pointerEvents: 'none',
                                    transition: 'background-size 0.5s ease',
                                }}
                            ></div>
                        )}
                        <div>
                            <h1 className="font-semibold text-xl mb-2">SAMSUNG Galaxy Note 20 Ultra 5G (Mystic Black, 256 GB)  (12 GB RAM)</h1>
                            <p className="text-gray-500 font-medium mb-2">224 Ratings & 46 Reviews</p>
                            <h1 className="text-3xl font-semibold mb-2">₹70,000</h1>
                            <h1 className="text-5xl font-semibold mb-2">Coming Soon</h1>
                            <div className="flex my-3">
                                <h3 className="border border-gray-200 p-2 bg-gray-100 text-blue-500 font-bold">Samsung</h3>
                                <p className="ml-10 mt-2">1 Year Warranty Provided by the Manufacturer from Date of Purchase</p>
                            </div>
                            <p className="font-medium text-gray-700 mb-2">Color</p>
                        </div>
                        <div className="mt-5">
                            {Array.from({ length: 30 }, (_, index) => (
                                <p key={index} className="text-gray-600 mb-1">
                                    Additional information line {index + 1}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
