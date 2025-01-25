

const Profile = () => {
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
          value="John Doe"
          className="w-full p-2 border border-gray-300 rounded-md mt-2"
          disabled
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
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200">
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
