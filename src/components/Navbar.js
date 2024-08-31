import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons

const Navbar = () => {
  const [items, setItems] = useState([]);
  const [subItems, setSubItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to handle dropdown visibility

  // Fetch items from the backend
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8082/NavItemMaster/findAll');
      console.log('Fetched items:', response.data); // Debugging line
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Fetch sub-items based on the selected item ID
  const fetchSubItems = async (itemId) => {
    try {
      const response = await axios.get('http://localhost:8082/subNavItemMaster/subitems', {
        params: { navItemMasterId: itemId }
      });
      console.log('Fetched sub-items:', response.data); // Debugging line
      setSubItems(response.data); // Response is a list of strings
      setSelectedItemId(itemId);
      setIsDropdownOpen(true); // Open dropdown when sub-items are fetched
    } catch (error) {
      console.error('Error fetching sub-items:', error);
    }
  };

  // Handle click event to fetch sub-items
  const handleItemClick = (itemId) => {
    if (selectedItemId === itemId) {
      setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility if the same item is clicked
    } else {
      fetchSubItems(itemId);
    }
  };

  // Load items when component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className=" mt-1 w-full">
      <div className="bg-gray-200 rounded-lg shadow-lg">
        <div className="grid grid-flow-col">
          {items.map(item => (
            <div
              key={item.id}
              className="relative w-full bg-gray-200 p-4 font-semibold  text-xl hover:bg-gray-200 cursor-pointer"
              onClick={() => handleItemClick(item.id)}
            >
              <div className="flex items-center justify-between">
                <span>{item.itemName ? item.itemName : 'No item name available'}</span>
                {selectedItemId === item.id && (
                  <button
                    className="ml-2"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                )}
              </div>

              {selectedItemId === item.id && isDropdownOpen && (
                <div className="absolute mt-5 w-full bg-white p-3 text-lg rounded-lg shadow-md z-10">
                  <ul className="list-none pl-0">
                    {subItems.length > 0 ? (
                      subItems.map((subItemName, index) => (
                        <li key={index} className="mt-1 hover:font-bold">
                          {subItemName ? subItemName : 'No sub-item name available'}
                        </li>
                      ))
                    ) : (
                      <li>No sub-items available</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
