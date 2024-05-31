"use client";
import { updateUserDetails } from "@/actions/authAction/authActions";
import { useUser } from "@/store/UserProvider";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

function UserUpdateForm() {
    const user = useUser()((state) => state.user);
    console.log("user=========================", user);
    
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [photo, setPhoto] = useState<any>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPhoto(files[0]);
    }
    
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    let bodyContent = new FormData();
    bodyContent.append("name", name);
    bodyContent.append("email", email);
    if (photo) {
      bodyContent.append("photo", photo);
    }

    try {
      const response = await updateUserDetails(bodyContent);
      console.log(response);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
        <div>
            <Image src={`http://localhost:8084/img/users/${user?.photo}`} alt="user" width={100} height={100} className="rounded-full border border-gray-200" />
        </div>
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto border border-gray-200 rounded-lg p-4">
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name
        </label>
        <input
          name="name"
          type="text"
          id="name"
          className="p-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p- dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          name="email"
          type="email"
          id="email"
          className="p-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p- dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="name@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Photo
        </label>
        <input
          name="photo"
          type="file"
          id="photo"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Update Profile
      </button>
    </form>
    </div>
  );
}

export default UserUpdateForm;