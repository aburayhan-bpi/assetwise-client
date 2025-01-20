import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUserCircle } from "react-icons/fa";
import useCurrentUser from "../../hooks/useCurrentUser";
import { Link } from "react-router-dom";

const AddEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const currentUser = useCurrentUser();

  // fetch no affiliatedWith employees
  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      const employee = res.data.filter(
        (emp) => emp?.role === "employee" && !emp?.affiliatedWith
      );
      setEmployees(employee);
    });
  }, []);

  // load hr manager information

  const handleSelectEmployee = (empId) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(empId)
        ? prevSelected.filter((id) => id !== empId)
        : [...prevSelected, empId]
    );
  };

  console.log(currentUser);
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Add an Employee
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Manage employee limits and effortlessly build your team.
        </p>
      </div>

      {/* Package Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Employee Limits</h2>
            <p className="text-lg">
              Current Members:{" "}
              <span className="font-semibold">static0 / {currentUser?.limit}</span>
            </p>
          </div>
          {currentUser?.limit >= 20 ? (
            <div>
              <button
                disabled
                className="border bg-red-100 text-red-600 px-2 py-1 rounded-lg cursor-not-allowed"
              >
                Max package limit reached
              </button>
            </div>
          ) : (
            <Link to="/increase-limit">
              <button className="bg-white text-blue-600 outline font-semibold px-5 py-3 rounded-lg shadow hover:bg-gray-100 transition">
                Increase Limit
              </button>
            </Link>
          )}
        </div>
        <p className="text-sm">
          Upgrade your package to increase the number of team members.
        </p>
      </div>

      {/* Non-affiliated Employees Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Available Employees
        </h2>
        <p className="text-gray-600 mb-8">
          Select employees to add to your team.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-6 mb-8">
          {employees.map((emp) => (
            <div
              key={emp?._id}
              className="flex items-center p-4 bg-gray-50 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <input
                onClick={() => handleSelectEmployee(emp?._id)}
                type="checkbox"
                className="checkbox checkbox-md mr-3"
              />
              <img
                src={emp?.photo ? emp?.photo : <FaUserCircle />}
                alt={emp?.name}
                className="w-12 h-12 object-cover rounded-full mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-bold text-gray-800">{emp?.name}</h3>
                <p className="text-sm text-gray-500">
                  {emp?.affiliatedWith
                    ? `Affiliated With: ${emp?.affiliatedWith}`
                    : "Not Affiliated"}
                </p>
              </div>
              <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Add to Team
              </button>
            </div>
          ))}
        </div>

        <button className="bg-blue-600 text-white font-semibold w-full py-3 rounded-lg hover:bg-blue-700 transition">
          Add Selected Members to the Team
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
