import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useCurrentUser from "../hooks/useCurrentUser";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();
  const currentUser = useCurrentUser();
  console.log(currentUser);
  const [name, setName] = useState("");
  useEffect(() => {
    if (currentUser?.name) {
      setName(currentUser.name);
    }
  }, [currentUser]);
  // handle name change
  const handleNameChange = async (empId) => {
    // update name in firebase
    const currentPhotoURL = user?.photoURL;
    // console.log(name, currentPhotoURL);
    await updateUserProfile(name, currentPhotoURL).then((result) => {
      console.log(result);
    });

    // update name to database also
    axiosSecure.patch(`/update-name/${empId}?newName=${name}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        toast.success("Name updated!");
      }
    });

    console.log(empId);
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Profile Page
      </h2>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-gray-600 font-semibold">Full Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          defaultValue={user?.displayName}
          className="w-full p-2 border border-gray-300 rounded-md mt-2"
        />
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-gray-600 font-semibold">Email</label>
        <input
          type="email"
          value="johndoe@example.com"
          className="w-full p-2 border border-gray-300 rounded-md mt-2"
          readOnly
          disabled
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => handleNameChange(currentUser?._id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          Update
        </button>
        <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-all duration-200">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Profile;
