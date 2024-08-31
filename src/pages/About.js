import React, { useState } from 'react';

const About = () => {
  // Initial video source
  const initialSrc = './images/logovideo.mp4';
  // Second video source
  const hoverSrc = './images/logosvideo.mp4';
  // State to hold the video source
  const [videoSrc, setVideoSrc] = useState(initialSrc);

  const handleMouseEnter = () => {
    setVideoSrc(hoverSrc);
  };

  const handleMouseLeave = () => {
    setVideoSrc(initialSrc);
  };

  return (
    <div className='bg-white mt-2 p-3 rounded-md'>
      <h1>About my website</h1>
      <p>An <strong>Auspicious Shop</strong> is a vibrant online marketplace dedicated to offering a curated selection of products that bring positive energy and good fortune. Whether you're seeking unique gifts, home essentials, or special items for celebrations, our shop combines quality and charm to enhance your shopping experience. Explore a range of carefully chosen products designed to add a touch of auspiciousness to your life and surroundings.</p>
      <div className="flex items-center justify-center ">
        <div className="relative w-1/3 h-1/3 overflow-hidden">
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full h-auto object-cover cursor-pointer"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default About;
