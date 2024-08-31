// import React from 'react'

// const Setting = () => {
//   return (
//     <div className="bg-white py-3 rounded-md w-full h-full mt-2">
//         <div>
//             <h1 className="text-center font-bold text-2xl mt-0">Setting</h1>
//         </div>
//     </div>
//   )
// }

// export default Setting

import React, { useState } from 'react';

const UserSettings = () => {
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@example.com' });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState('');

  const handleProfileChange = () => {
    // Here, you would normally make an API call to update the profile
    setNotification('Profile updated successfully');
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setNotification('Passwords do not match');
      return;
    }
    // Here, you would normally make an API call to change the password
    setNotification('Password changed successfully');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">User Settings</h1>
      {notification && <p className="text-red-500 mb-4">{notification}</p>}
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          onClick={handleProfileChange}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save Profile
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Change Password</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          onClick={handlePasswordChange}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Change Password
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Notification Preferences</h2>
        {/* Add your notification settings controls here */}
        {/* Example */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Email Notifications</span>
          </label>
        </div>
        {/* More preferences can be added here */}
      </div>
    </div>
  );
};

export default UserSettings;
