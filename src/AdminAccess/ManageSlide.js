import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";

const ManageSlide = () => {
    const [slides, setSlides] = useState([]);
    const [newSlide, setNewSlide] = useState({
        title: '',
        description: '',
        buttonName: '',
        buttonLink: '',
        buttonColor: '',
        backgroundColor: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [editingSlide, setEditingSlide] = useState(null);

    // Fetch slides from the backend
    const fetchSlides = async () => {
        try {
            const response = await axios.get('http://localhost:8082/slidesMaster');
            console.log('Slides fetched:', response.data);
            setSlides(response.data);
        } catch (error) {
            console.error('Error fetching slides:', error);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSlide((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'image/png') {
            setSelectedFile(file);

            // Preview selected image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a .png file');
        }
    };

    // Discard selected image
    const discardImage = () => {
        setSelectedFile(null);
        setImagePreview(null);
    };

    // Add or update a slide
    const saveSlide = async () => {
        try {
            let imageSrc = editingSlide ? editingSlide.imageSrc : '';

            if (selectedFile) {
                // Upload image
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('id', editingSlide ? editingSlide.id : 0); // Pass the slide ID if editing
                const uploadResponse = await axios.post('http://localhost:8082/filesUploadMaster/upload', formData);
                console.log('Image upload response:', uploadResponse.data);
                imageSrc = uploadResponse.data.fileUri; // Use the correct field for URL
            }

            // Add or update slide
            const slideData = { ...newSlide, imageSrc };
            if (editingSlide) {
                await axios.put(`http://localhost:8082/slidesMaster/update/${editingSlide.id}`, slideData);
                setSlides((prevSlides) =>
                    prevSlides.map((slide) => (slide.id === editingSlide.id ? { ...slide, ...slideData } : slide))
                );
            } else {
                const response = await axios.post('http://localhost:8082/slidesMaster/addSlide', slideData);
                setSlides((prevSlides) => [...prevSlides, response.data]);
            }

            resetForm(); // Reset form
        } catch (error) {
            console.error('Error saving slide:', error);
        }
    };

    // Edit slide
    const editSlide = (slide) => {
        setNewSlide({
            title: slide.title,
            description: slide.description,
            buttonName: slide.buttonName,
            buttonLink: slide.buttonLink,
            buttonColor: slide.buttonColor,
            backgroundColor: slide.backgroundColor,
        });
        setImagePreview(slide.imageSrc);
        setSelectedFile(null);
        setEditingSlide(slide);
    };

    // Handle slide deletion
    const deleteSlide = async (id) => {
        try {
            await axios.delete(`http://localhost:8082/slidesMaster/delete/${id}`);
            setSlides((prevSlides) => prevSlides.filter((slide) => slide.id !== id));
        } catch (error) {
            console.error('Error deleting slide:', error);
        }
    };

    // Reset form
    const resetForm = () => {
        setNewSlide({
            title: '',
            description: '',
            buttonName: '',
            buttonLink: '',
            buttonColor: '',
            backgroundColor: '',
        });
        setSelectedFile(null);
        setImagePreview(null);
        setEditingSlide(null);
    };

    // Load slides on component mount
    useEffect(() => {
        fetchSlides();
    }, []);

    return (
        <div className="p-8">
            <h2 className='font-bold text-xl text-center'>{editingSlide ? 'Edit Slide' : 'Add Slide'}</h2>
            <div className="mb-5">
                <div className='flex space-x-4'>
                    <div className="w-1/2 bg-white p-7 my-3 rounded-lg">
                        <div className='mb-2'>
                            <label className='font-bold mb-1'>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={newSlide.title}
                                onChange={handleChange}
                                placeholder="Title"
                                className="block mb-2 p-2 border border-gray-300"
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='font-bold mb-1'>Description</label>
                            <textarea
                                name="description"
                                value={newSlide.description}
                                onChange={handleChange}
                                placeholder="Description"
                                className="block mb-2 p-2 border border-gray-300"
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='font-bold mb-1'>Button Name</label>
                            <input
                                type="text"
                                name="buttonName"
                                value={newSlide.buttonName}
                                onChange={handleChange}
                                placeholder="Button Name"
                                className="block mb-2 p-2 border border-gray-300"
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='font-bold mb-1'>Button Link</label>
                            <input
                                type="text"
                                name="buttonLink"
                                value={newSlide.buttonLink}
                                onChange={handleChange}
                                placeholder="Button Link"
                                className="block mb-2 p-2 border border-gray-300"
                            />
                        </div>
                    </div>
                    <div className="w-1/2 bg-white p-7 my-3 rounded-lg">
                        <div className='mb-2'>
                            <label className='font-bold mb-1'>Button Color</label>
                            <input
                                type="color"
                                name="buttonColor"
                                value={newSlide.buttonColor}
                                onChange={handleChange}
                                className="block mb-2 p-2 border border-gray-300"
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='font-bold mb-1'>Background Color</label>
                            <input
                                type="color"
                                name="backgroundColor"
                                value={newSlide.backgroundColor}
                                onChange={handleChange}
                                className="block mb-2 p-2 border border-gray-300"
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='font-bold mb-1'>Choose png Image(430x400)</label>
                            <input
                                type="file"
                                accept=".png"
                                onChange={handleFileChange}
                                className="block mb-2"
                            />
                        </div>
                        <div>
                            {imagePreview && (
                                <div className="relative mb-2 inline-block">
                                    <img src={imagePreview} alt="Selected preview" className="w-32 h-32 object-cover" />
                                    <button
                                        onClick={discardImage}
                                        className="absolute top-0 right-0 bg-green-700 hover:bg-red-700 text-white p-1 rounded-full"
                                        style={{ width: '24px', height: '24px' }} // Adjust button size
                                    >
                                        <IoClose />
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                <button
                    onClick={saveSlide}
                    className="bg-blue-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                    {editingSlide ? 'Update Slide' : 'Add Slide'}
                </button>
                <button
                    onClick={resetForm}
                    className="bg-gray-500 hover:bg-red-700 text-white px-4 py-2 rounded ml-2"
                >
                    Cancel
                </button>
            </div>
            <div className="bg-white p-3 rounded-lg">
                <table className="min-w-full divide-y divide-gray-500">
                    <thead>
                        <tr>
                            <th className='p-4'>Title</th>
                            <th className='p-4'>Description</th>
                            <th className='p-4'>Button Name</th>
                            <th className='p-4'>Button Link</th>
                            <th className='p-4'>Button Color</th>
                            <th className='p-4'>Background Color</th>
                            <th className='p-4'>Image</th>
                            <th className='p-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-500">
                        {slides.map((slide) => (
                            <tr key={slide.id}>
                                <td className='text-center'>{slide.title}</td>
                                <td className='w-60'>{slide.description}</td>
                                <td className='text-center'>{slide.buttonName}</td>
                                <td className='text-center'>{slide.buttonLink}</td>
                                <td style={{ backgroundColor: slide.buttonColor }}>{slide.buttonColor}</td>
                                <td style={{ backgroundColor: slide.backgroundColor }}>{slide.backgroundColor}</td>
                                <td>
                                    {slide.imageSrc && slide.imageSrc.endsWith('.png') && (
                                        <img src={slide.imageSrc} alt="Slide" className="w-16 h-16 object-cover" />
                                    )}
                                </td>
                                <td className='flex ml-3 space-x-9'>
                                    <div>
                                        <button
                                            onClick={() => editSlide(slide)}
                                            className="bg-yellow-500 text-white mt-3 px-3 py-3 rounded-full"
                                        >
                                            <MdEdit />
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => deleteSlide(slide.id)}
                                            className="bg-red-500 text-white px-3 py-3 rounded-full mt-3"
                                        >
                                            <MdDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageSlide;
