import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';

const Dashboard = () => {
  return (
    <div className="relative flex min-h-screen">
      <div className="flex flex-col w-full">
        {/* <div className="flex flex-col w-full ml-[20%]"> */}
        <Header />
        {/* Dashbord Element */}
        <main className="flex-grow p-4 mt-3 mx-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
