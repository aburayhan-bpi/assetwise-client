import { FaUserCircle, FaUserTie, FaUser } from "react-icons/fa";
import useTeam from "../../hooks/useTeam";
import Loader from "../../components/shared/Loader";
import { ImGift } from "react-icons/im";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useCurrentUser from "../../hooks/useCurrentUser";
import { Link } from "react-router-dom";

const MyEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  const [team, refetchTeam, isLoading] = useTeam();

  const hrEmail =
    currentUser?.role === "hr" && currentUser?.email === user?.email;

  // console.log(hrEmail);

  const handleRemoveMember = (id) => {
    // Add your remove logic here
    // console.log("Remove member with ID:", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(
            `/delete-team-member/${id}?email=${hrEmail && currentUser?.email}`
          )
          .then((res) => {
            // console.log(res.data);
            if (res.data.message === "Team member deleted successfully") {
              refetchTeam();
              Swal.fire({
                title: "Deleted!",
                text: "Team member has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Team Members</h1>
        <p className="text-gray-600 mt-3 text-lg">
          View and manage your team members efficiently.
        </p>
      </div>

      {/* Team Members List */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your Team - ({team?.length || 0})
        </h2>
        <p className="text-gray-600 mb-8">
          Below is a list of all team members. You can remove any member if
          needed.
        </p>
        {team?.length === 0 && (
          <Link to="/add-employee">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out">
              Add Employee
            </button>
          </Link>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {team?.map((member) => (
              <div
                key={member?._id}
                className="bg-gray-100 rounded-lg p-6 flex flex-col items-center"
              >
                <div className="mb-4">
                  {member?.photo ? (
                    <img
                      src={member?.photo}
                      alt={member?.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src="https://i.ibb.co/ZKC1JP1/7718888.png"
                      alt={member?.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  )}
                </div>
                <h3 className="text-lg font-semibold">{member?.name}</h3>
                <p className="text-gray-500 text-sm my-1">
                  {member?.role === "admin" ? (
                    <span>
                      <FaUserTie className="inline-block mr-1" />
                      Admin
                    </span>
                  ) : (
                    <span className="bg-blue-100 p-1 rounded-lg">
                      <FaUser className="inline-block mr-1" />
                      Employee
                    </span>
                  )}
                </p>
                <button
                  onClick={() => handleRemoveMember(member?._id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEmployeeList;
