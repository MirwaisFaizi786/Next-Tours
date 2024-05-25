"use client";
import { useState } from 'react';

export default function AddTourForm() {
  const [formData, setFormData] = useState({
    name: '',
    summary: '',
    price: '',
    duration: '',
    difficulty: '',
    maxGroupSize: '',
    ratingsAverage: '',
    startLocation: {
      address: '',
      description: '',
      coordinates: ['', ''],
    },
    locations: [{ description: '', day: '', coordinates: ['', ''] }],
    images: ['', '', ''],
    startDates: ['', '', ''],
    description: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Tour added successfully');
      } else {
        console.error('Error adding tour');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tour Name"
          className="border border-gray-300 rounded-md p-2"
        />
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Summary"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (days)"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          placeholder="Difficulty"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          name="maxGroupSize"
          value={formData.maxGroupSize}
          onChange={handleChange}
          placeholder="Max Group Size"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          name="ratingsAverage"
          value={formData.ratingsAverage}
          onChange={handleChange}
          placeholder="Ratings Average"
          className="border border-gray-300 rounded-md p-2"
        />
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="startLocation.address"
            value={formData.startLocation.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                startLocation: {
                  ...formData.startLocation,
                  address: e.target.value,
                },
              })
            }
            placeholder="Start Location Address"
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            name="startLocation.description"
            value={formData.startLocation.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                startLocation: {
                  ...formData.startLocation,
                  description: e.target.value,
                },
              })
            }
            placeholder="Start Location Description"
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="number"
            name="startLocation.coordinates[0]"
            value={formData.startLocation.coordinates[0]}
            onChange={(e) =>
              setFormData({
                ...formData,
                startLocation: {
                  ...formData.startLocation,
                  coordinates: [
                    e.target.value,
                    formData.startLocation.coordinates[1],
                  ],
                },
              })
            }
            placeholder="Start Location Latitude"
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="number"
            name="startLocation.coordinates[1]"
            value={formData.startLocation.coordinates[1]}
            onChange={(e) =>
              setFormData({
                ...formData,
                startLocation: {
                  ...formData.startLocation,
                  coordinates: [
                    formData.startLocation.coordinates[0],
                    e.target.value,
                  ],
                },
              })
            }
            placeholder="Start Location Longitude"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Add Tour
        </button>
      </form>
    </div>
  );
}
