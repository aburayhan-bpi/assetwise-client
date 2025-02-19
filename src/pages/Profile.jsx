import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useCurrentUser from "../hooks/useCurrentUser";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();
  const currentUser = useCurrentUser();
  // console.log(currentUser);
  const [name, setName] = useState("");

  const navigate = useNavigate();

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
      // console.log(result);
    });

    // update name to database also
    axiosSecure.patch(`/update-name/${empId}?newName=${name}`).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        toast.success("Name updated!");
        navigate("/");
      }
    });

    // console.log(empId);
  };

  return (
    <div className="p-6 rounded-lg">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      {/* <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Profile
      </h2> */}
      <div>
        {user && user?.email ? (
          <>
            <img
              className="w-32 h-32 mx-auto rounded-full border-4 border-blue-600"
              src={user?.photoURL}
              alt="avatar"
            />
          </>
        ) : (
          ""
        )}
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-gray-600 font-semibold">Full Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          defaultValue={user?.displayName}
          className="w-full p-2 border border-gray-300 dark:bg-gray-600 dark:border-none dark:outline-none dark:text-white rounded-md mt-2"
        />
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-gray-600 font-semibold">Email</label>
        <input
          type="email"
          value="johndoe@example.com"
          className="w-full p-2 border border-gray-300 dark:border-none dark:outline-none dark:text-white rounded-md mt-2"
          readOnly
          disabled
        />
      </div>
      {/* Email */}
      <div className="mb-6">
        {currentUser?.package && (
          <>
            <div className=" flex items-center gap-6">
              <p className="bg-blue-100 w-fit px-3 rounded-lg">
                Current Package: ${currentUser?.package}
              </p>
              <p className="bg-yellow-100 w-fit px-3 rounded-lg">
                Current Limit: {currentUser?.limit}
              </p>
            </div>
          </>
        )}
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
