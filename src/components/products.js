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
        <div className="flex justify-center bg-white w-full">
            <div className="grid w-[420.8px] bg-white">
                <div className="relative h-[383.99px]">
                    <div className="flex h-full">
                        <div className="relative w-[63.99px]">
                            {startIndex > 0 && (
                                <button
                                    className="absolute top-0 left-0 right-0 bg-white border border-gray-300 shadow-md hover:bg-gray-100"
                                    onClick={handleScrollUp}
                                >
                                    <IoChevronUpSharp className='text-black' />
                                </button>
                            )}
                            <div className="overflow-y-auto h-[335.99px]">
                                <div className="grid grid-rows-7 gap-2">
                                    {visibleImages.map((img, index) => (
                                        <img
                                            key={index}
                                            className="border border-gray-300 h-[63.99px] w-[63.99px] hover:border-blue-600 cursor-pointer"
                                            src={img}
                                            alt={`Thumbnail ${index}`}
                                            onClick={() => setSelectedImage(img)}
                                        />
                                    ))}
                                </div>
                            </div>
                            {startIndex < images.length - 7 && (
                                <button
                                    className="absolute bottom-0 left-0 right-0 bg-white border border-gray-300 shadow-md hover:bg-gray-100"
                                    onClick={handleScrollDown}
                                >
                                    <IoChevronDownOutline className='text-black' />
                                </button>
                            )}
                        </div>
                        <div className="flex justify-center items-center w-[356.81px]">
                            <div
                                className="relative w-[231.82px] h-[352px] overflow-hidden border border-gray-300 p-4 flex justify-center items-center"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{ cursor: 'none' }}
                            >
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    className="object-cover w-full h-full"
                                />
                                {isZooming && (
                                    <div
                                        className="absolute w-[135px] h-[116px] border border-gray-400 flex items-center justify-center"
                                        style={{
                                            left: `${zoomPosition.x}%`,
                                            top: `${zoomPosition.y}%`,
                                            transform: 'translate(-50%, -50%)',
                                            pointerEvents: 'none',
                                            cursor: 'none',
                                            backgroundImage: `radial-gradient(circle, #9CA3AF 1px, transparent 1px)`,
                                            backgroundSize: `4px 4px`,
                                        }}
                                    >
                                        <GoPlus className="text-gray-950 text-4xl" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <button className="w-full py-2 bg-blue-500 text-white font-semibold hover:bg-blue-600">Notify Me</button>
                    <p className="text-gray-500 text-center mt-1">Get notified when this item comes back in stock.</p>
                </div>
            </div>

            <div className='relative bg-white w-full h-full overflow-y-auto'>
                <div className="overflow-y-auto max-h-[584.55px]">
                    {isZooming && (
                        <div
                            className="absolute w-full h-full"
                            style={{
                                backgroundImage: `url(${selectedImage})`,
                                backgroundSize: '200%',
                                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                border: '2px solid #ccc',
                                pointerEvents: 'none',
                            }}
                        ></div>
                    )}
                    <div className="p-4">
                        <h1 className="font-semibold">SAMSUNG Galaxy Note 20 Ultra 5G (Mystic Black, 256 GB) (12 GB RAM)</h1>
                        <p className="text-gray-500 font-medium">224 Ratings & 46 Reviews</p>
                        <h1 className="text-3xl font-semibold">₹70,000</h1>
                        <h1 className="text-5xl font-semibold">Coming Soon</h1>
                        <div className='flex my-3'>
                            <h3 className="border border-gray-200 p-2 bg-gray-100 text-blue-500 font-bold">Samsung</h3>
                            <p className='ml-10 mt-2'>1 Year Warranty Provided by the Manufacturer from Date of Purchase</p>
                        </div>
                        <p>Color</p>
                    </div>
                    <div className="mt-5">
                        {Array.from({ length: 30 }, (_, index) => (
                            <p key={index} className="text-gray-600">
                                Hiiiiiiiiiiiiiiiiii line {index + 1}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
