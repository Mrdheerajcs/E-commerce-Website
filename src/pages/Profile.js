import React from 'react';

const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg -mt-32">
        <img 
          src="./images/profile.png" 
          alt="Profile" 
          className="w-32 h-32 rounded-full border-4 border-gray-300 mb-4" 
        />
        <h1 className="text-2xl font-semibold mb-2">Dheeraj Kumar</h1> 
        <p className="text-gray-600">dheeraj@gmail.com</p>
        <p className="text-gray-600">9911882237</p>
        <p className="text-gray-600">male</p>
        <p className="text-gray-600">india</p>
      </div>
    </div>
  );
};

export default Profile;
