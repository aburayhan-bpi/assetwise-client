import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAuth from "../../hooks/useAuth";
import useMyTeam from "../../hooks/useMyTeam";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const MyTeam = () => {
  const [myTeam, refetchTeam, isLoading] = useMyTeam();

  console.log("My team info", myTeam);
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="text-center bg-gradient-to-r from-teal-700 to-cyan-500 text-white py-12">
        <h1 className="text-4xl font-bold">Meet Our Team</h1>
        <p className="text-lg mt-2">The People Who Make It All Happen</p>
      </header>

      {/* Team Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myTeam.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center transition transform hover:scale-105 hover:shadow-lg"
            >
              {member?.photo ? (
                <img
                  src={member?.photo}
                  alt={member?.name}
                  className="w-24 object-cover h-24 mx-auto rounded-full border-4 border-teal-500"
                />
              ) : (
                <img
                  src="https://i.ibb.co/C8S0BS8/profile.jpg"
                  alt={member?.name}
                  className="w-24 h-24 mx-auto rounded-full border-4 border-teal-500"
                />
              )}

              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {member?.name}
              </h2>
              <h2 className="flex items-center gap-1 capitalize bg-green-50 text-green-500 mb-2 w-fit mx-auto rounded-md px-3 text-xs">
                <FaUsers /> {member?.role}
              </h2>
              <h2 className="flex items-center gap-1 capitalize bg-blue-50 text-blue-500 w-fit mx-auto rounded-md px-3 text-xs">
                <MdOutlineAdminPanelSettings /> {member?.affiliatedWith}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
