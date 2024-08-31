import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircleIcon, CheckCircleIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const NavItem = () => {
  const [formData, setFormData] = useState({ id: null, itemName: '' });
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const api = axios.create({
    baseURL: 'http://localhost:8082/NavItemMaster',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get('/findAll');
      setItems(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddItem = async () => {
    try {
      const response = await api.post('/save', formData);
      setItems([...items, response.data]); // Add new item to the list
      setFormData({ id: null, itemName: '' }); // Reset form
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleEditItem = (index) => {
    setFormData(items[index]); // Set form data to item being edited
    setEditingIndex(index);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await api.put(`/update/${formData.id}`, formData);
      const updatedItems = items.map((item, index) =>
        index === editingIndex ? response.data : item
      );
      setItems(updatedItems);
      setFormData({ id: null, itemName: '' });
      setEditingIndex(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (index) => {
    try {
      await api.delete(`/delete/${items[index].id}`);
      setItems(items.filter((_, i) => i !== index)); // Remove item from list
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateString = date.toLocaleDateString(); // Format date as "MM/DD/YYYY"
    const timeString = date.toLocaleTimeString(); // Format time as "HH:MM:SS AM/PM"
    return `${dateString} ${timeString}`;
  };

  const filteredItem = items.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalItems = filteredItem.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedItem = filteredItem.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div className="mb-4 bg-slate-100 p-4 rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          <input
            item="text"
            placeholder="Item Name"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
            className="p-2 border rounded-md outline-none"
          />
        </div>
        <div className="mt-3 flex justify-start">
          {editingIndex === null ? (
            <button onClick={handleAddItem} className="bg-rose-900 text-white rounded-2xl p-2 flex items-center text-sm justify-center">
              <PlusCircleIcon className="h-5 w-5 mr-1" /> Add Item
            </button>
          ) : (
            <button onClick={handleSaveEdit} className="bg-rose-900 text-white rounded-2xl p-2 flex items-center text-sm justify-center">
              <CheckCircleIcon className="h-5 w-5 mr-1" /> Save
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-l-md p-1 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MagnifyingGlassIcon className="text-white bg-blue-500 rounded-r-lg h-8 w-8 border p-1.5" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-2 text-left">Sr</th>
              <th className="border p-2 text-left">Item Name</th>
              <th className="border p-2 text-left">Created On</th>
              <th className="border p-2 text-left">Updated On</th>
              <th className="border p-2 text-left">Edit</th>
              <th className="border p-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItem.length === 0 ? (
              <tr>
                <td colSpan="6" className="border p-2 text-center">No items available</td>
              </tr>
            ) : (
              paginatedItem.map((item, index) => (
                <tr key={item.id}>
                  <td className="border p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="border p-2">{item.itemName || 'No Name'}</td>
                  <td className="border p-2">{formatDateTime(item.createdOn) || 'N/A'}</td>
                  <td className="border p-2">{formatDateTime(item.updatedOn) || 'N/A'}</td>
                  <td className="border p-2">
                    <button onClick={() => handleEditItem(index)}>
                      <PencilIcon className="h-6 w-6 text-white bg-yellow-400 rounded-xl p-1" />
                    </button>
                  </td>
                  <td className="border p-2">
                    <button onClick={() => handleDeleteItem(index)}>
                      <TrashIcon className="h-6 w-6 text-white bg-red-500 rounded-xl p-1" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div>
          <span className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavItem;
