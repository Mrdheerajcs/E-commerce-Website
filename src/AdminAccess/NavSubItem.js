import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircleIcon, CheckCircleIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const NavSubItem = () => {
  const [formData, setFormData] = useState({ item: null, subItemName: '' });
  const [subItems, setSubItems] = useState([]);
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const api = axios.create({
    baseURL: 'http://localhost:8082',
  });

  useEffect(() => {
    fetchSubItems();
    fetchItems();
  }, []);

  const fetchSubItems = async () => {
    try {
      const response = await api.get('/SubNavItemMaster/findAll');
      console.log('Fetched Sub Items:', response.data); // Log fetched data
      setSubItems(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching Sub items:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await api.get('/NavItemMaster/findAll');
      console.log('Fetched Items:', response.data); // Log fetched data
      setItems(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (e) => {
    const selectedItem = items.find(item => item.id === parseInt(e.target.value));
    setFormData({ ...formData, item: selectedItem });
  };

  const handleAddItem = async () => {
    try {
      const response = await api.post('/SubNavItemMaster/save', formData);
      console.log('Added Sub Item:', response.data); // Log newly added item
      setSubItems([...subItems, response.data]); // Add new item to the list
      setFormData({ item: null, subItemName: '' }); // Reset form
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleEditItem = (index) => {
    setFormData(subItems[index]); // Set form data to item being edited
    setEditingIndex(index);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await api.put(`/SubNavItemMaster/update/${formData.id}`, formData);
      console.log('Updated Sub Item:', response.data); // Log updated item
      const updatedSubItems = subItems.map((item, index) =>
        index === editingIndex ? response.data : item
      );
      setSubItems(updatedSubItems);
      setFormData({ item: null, subItemName: '' });
      setEditingIndex(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (index) => {
    try {
      await api.delete(`/SubNavItemMaster/delete/${subItems[index].id}`);
      console.log('Deleted Sub Item:', subItems[index]); // Log deleted item
      setSubItems(subItems.filter((_, i) => i !== index)); // Remove item from list
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

  const filteredSubItems = subItems.filter(subItem =>
    Object.values(subItem).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalItems = filteredSubItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedSubItems = filteredSubItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div className="mb-4 bg-slate-100 p-4 rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Sub Item Name"
            name="subItemName"
            value={formData.subItemName}
            onChange={handleInputChange}
            className="p-2 border rounded-md outline-none"
          />
          <select
            name="item"
            value={formData.item?.id || ''}
            onChange={handleItemChange}
            className="p-2 border rounded-md outline-none"
          >
            <option value="">Select Item</option>
            {items.map(item => (
              <option key={item.id} value={item.id}>{item.itemName}</option>
            ))}
          </select>
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
              <th className="border p-2 text-left">Sub Item Name</th>
              <th className="border p-2 text-left">Created On</th>
              <th className="border p-2 text-left">Updated On</th>
              <th className="border p-2 text-left">Edit</th>
              <th className="border p-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSubItems.length === 0 ? (
              <tr>
                <td colSpan="7" className="border p-2 text-center">No items available</td>
              </tr>
            ) : (
              paginatedSubItems.map((subItem, index) => (
                <tr key={subItem.id}>
                  <td className="border p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="border p-2">{subItem.item?.itemName || 'No Name'}</td>
                  <td className="border p-2">{subItem.subItemName || 'No Name'}</td>
                  <td className="border p-2">{formatDateTime(subItem.createdOn) || 'N/A'}</td>
                  <td className="border p-2">{formatDateTime(subItem.updatedOn) || 'N/A'}</td>
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

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            className="bg-blue-500 text-white p-2 rounded"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
          </span>
          <button
            onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
            className="bg-blue-500 text-white p-2 rounded"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavSubItem;
