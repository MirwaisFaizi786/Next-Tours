"use client";
import { TourFormData, Location } from "@/types/tourFormType";
import React, { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
const tourFormSchema = z.object({
  name: z.string().min(10, "Name must be at least 10 characters").max(32, "Name must be less than 32 characters"),
  duration: z.number().min(1, "Duration must be at least 1 day"),
  maxGroupSize: z.number().min(1, "Max group size must be at least 1"),
  difficulty: z.enum(["easy", "medium", "difficult"], { required_error: "Difficulty is required " }),
  ratingsAverage: z.number().min(1, "Ratings must be at least 1").max(5),
  price: z.number().min(1, "Price must be at least 1"),
  priceDiscount: z.number().min(0, "Price discount must be at least 0").optional(),
  summary: z.string().nonempty("Summary is required"),
  description: z.string().optional(),
  imageCover: z.instanceof(File).optional(),
  images: z.array(z.instanceof(File)).optional(),
  startLocation: z.object({
    address: z.string().nonempty("Start location address is required"),
    description: z.string().nonempty("Start location description is required"),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
  locations: z.array(
    z.object({
      description: z.string().nonempty("Location description is required"),
      day: z.number().min(1, "Day must be at least 1"),
      coordinates: z.tuple([z.number(), z.number()]),
    })
  ),
  startDates: z.array(z.string().nonempty("Start date is required")),
}).refine(data => data.priceDiscount === undefined || data.priceDiscount < data.price, {
  message: "Price discount must be less than price",
  path: ["priceDiscount"], // This shows the error at the correct path
});




const AddTourForm = ({
  insertTourRecord,
  setShowTourForm,
}: {
  insertTourRecord: (formData: FormData) => Promise<any>;
  setShowTourForm: (show: boolean) => void;
}) => {
  const [formData, setFormData] = useState<TourFormData>({
    name: "",
    duration: 0,
    maxGroupSize: 0,
    difficulty: "",
    ratingsAverage: 0,
    price: 0,
    priceDiscount: 0,
    summary: "",
    description: "",
    imageCover: null,
    images: [],
    startLocation: {
      address: "",
      description: "",
      coordinates: [0, 0],
    },
    locations: [{ description: "", day: 0, coordinates: [0, 0] }],
    startDates: ["", "", ""],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "duration" ||
        name === "maxGroupSize" ||
        name === "ratingsAverage" ||
        name === "price" ||
        name === "priceDiscount"
          ? +value
          : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        imageCover: files[0],
      }));
    }
  };

  const handleMultipleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        images: Array.from(files),
      }));
    }
  };

  const handleLocationChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const locations = [...formData.locations];
    const location = locations[index];

    if (name === "coordinatesLat") {
      location.coordinates[0] = +value;
    } else if (name === "coordinatesLng") {
      location.coordinates[1] = +value;
    } else if (name === "day") {
      location.day = +value;
    } else if (name === "description") {
      location.description = value;
    }

    locations[index] = location;
    setFormData((prevData) => ({
      ...prevData,
      locations,
    }));
  };

  const addLocation = () => {
    setFormData((prevData) => ({
      ...prevData,
      locations: [
        ...prevData.locations,
        { description: "", day: 0, coordinates: [0, 0] },
      ],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      tourFormSchema.parse(formData);
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((image) => {
            data.append("images", image);
          });
        } else if (key === "locations") {
          data.append(key, JSON.stringify(formData[key as keyof TourFormData]));
        } else if(key === "startLocation"){
          data.append(key, JSON.stringify(formData[key as keyof TourFormData]));
        } else {
          data.append(key, formData[key as keyof TourFormData] as any);
        }
      });
     
      const response = await insertTourRecord(data).then((data) => data);
      
      if(response?.error){
        toast.error(`${response?.message}`,{
          style: {
            border: '1px solid #ff4d4f',
            padding: '16px',
            color: '#ff4d4f',
            background: '#fff1f0',
            zIndex: 500,
          },
          iconTheme: {
            primary: '#ff4d4f',
            secondary: '#fff',
          },
        });
      }else{
        toast.success("Tour added successfully!",{
          style: {
            border: '1px solid #4BB543',
            padding: '16px',
            color: '#4BB543',
            background: '#f3fff3',
            zIndex: 500,
          },
          iconTheme: {
            primary: '#4BB543',
            secondary: '#fff',
          },
        });
        setShowTourForm(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(`${err.path[0]}: ${err.message}`);
        });
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };


  return (
    <div className="card w-1/2 mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Tour Name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tour Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Tour Name"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Duration (days)
          </label>
          <input
            type="number"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Duration"
            required
          />
        </div>

        {/* Max Group Size */}
        <div>
          <label
            htmlFor="maxGroupSize"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Max Group Size
          </label>
          <input
            type="number"
            name="maxGroupSize"
            id="maxGroupSize"
            value={formData.maxGroupSize}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Max Group Size"
            required
          />
        </div>

        {/* Difficulty */}
        <div>
          <label
            htmlFor="difficulty"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Difficulty
          </label>
          <select
            name="difficulty"
            id="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required
          >
            <option value="" disabled>
              Select Difficulty
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>
        </div>

        {/* Ratings Average */}
        <div>
          <label
            htmlFor="ratingsAverage"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ratings Average
          </label>
          <input
            type="number"
            min={0}
            name="ratingsAverage"
            id="ratingsAverage"
            value={formData.ratingsAverage}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Ratings Average"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Price"
            required
          />
        </div>

        {/* Price Discount */}
        <div>
          <label
            htmlFor="priceDiscount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price Discount
          </label>
          <input
            type="number"
            name="priceDiscount"
            id="priceDiscount"
            value={formData.priceDiscount}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Price Discount"
          />
        </div>

        {/* Summary */}
        <div>
          <label
            htmlFor="summary"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Summary
          </label>
          <textarea
            name="summary"
            id="summary"
            value={formData.summary}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Summary"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Description"
          />
        </div>

        {/* Image Cover */}
        <div>
          <label
            htmlFor="imageCover"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cover Image
          </label>
          <input
            type="file"
            name="imageCover"
            id="imageCover"
            accept="image/*"
            onChange={handleFileChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required
          />
        </div>

        {/* Images */}
        <div>
          <label
            htmlFor="images"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Images
          </label>
          <input
            type="file"
            name="images"
            id="images"
            accept="image/*"
            multiple
            onChange={handleMultipleFileChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>

        {/* Start Location */}
        <div className="flex flex-col gap-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Start Location
          </label>
          <input
            type="text"
            name="startLocationAddress"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Address"
            required
          />
          <input
            type="text"
            name="startLocationDescription"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Description"
            required
          />
          <input
            type="number"
            name="startLocationCoordinatesLat"
            value={formData.startLocation.coordinates[0]}
            onChange={(e) =>
              setFormData({
                ...formData,
                startLocation: {
                  ...formData.startLocation,
                  coordinates: [
                    +e.target.value,
                    formData.startLocation.coordinates[1],
                  ],
                },
              })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Latitude"
            required
          />
          <input
            type="number"
            name="startLocationCoordinatesLng"
            value={formData.startLocation.coordinates[1]}
            onChange={(e) =>
              setFormData({
                ...formData,
                startLocation: {
                  ...formData.startLocation,
                  coordinates: [
                    formData.startLocation.coordinates[0],
                    +e.target.value,
                  ],
                },
              })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Longitude"
            required
          />
        </div>

        {/* Locations */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Locations
          </label>
          {formData.locations.map((location, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="description"
                value={location.description}
                onChange={(e) => handleLocationChange(index, e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2"
                placeholder="Description"
                required
              />
              <input
                type="number"
                name="day"
                value={location.day}
                onChange={(e) => handleLocationChange(index, e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2"
                placeholder="Day"
                required
              />
              <input
                type="number"
                name="coordinatesLat"
                value={location.coordinates[0]}
                onChange={(e) => handleLocationChange(index, e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2"
                placeholder="Latitude"
                required
              />
              <input
                type="number"
                name="coordinatesLng"
                value={location.coordinates[1]}
                onChange={(e) => handleLocationChange(index, e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2"
                placeholder="Longitude"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addLocation}
            className="text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Add Location
          </button>
        </div>

        {/* Start Dates */}
        <div>
          <label
            htmlFor="startDates"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Start Dates
          </label>
          {formData.startDates.map((date, index) => (
            <input
              key={index}
              type="date"
              name={`startDate${index}`}
              value={date}
              onChange={(e) => {
                const startDates = [...formData.startDates];
                startDates[index] = e.target.value;
                setFormData({ ...formData, startDates });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2"
              required
            />
          ))}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Add Tour
        </button>
      </form>
    </div>
  );
};

export default AddTourForm;
