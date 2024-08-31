import React from 'react';
import ImageSlide from '../components/ImageSlide';
import Product from '../components/Product';

const Home = () => {

  return (
    <div>
      <ImageSlide className="w-full"/>
      <div className='mt-3'>
        <Product />
      </div>
    </div>
  );
};

export default Home;
