import { RxCross2 } from "react-icons/rx";
import { MdOutlineDone, MdOutlineDoneAll, MdSearch } from "react-icons/md";
import useAllRequests from "../../hooks/useAllRequests";
import { useEffect, useState } from "react";
import Loader from "../../components/shared/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCurrentUser from "../../hooks/useCurrentUser";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { PiSortAscendingLight, PiSortDescendingLight } from "react-icons/pi";

const AllRequests = () => {
  // const [filteredAsset, setFilteredAsset] = useState(allRequests);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");
  const axiosSecure = useAxiosSecure();
  const currentUser = useCurrentUser();

  const [allRequests, refetch, isLoading] = useAllRequests(
    searchText,
    sortOption
  );

  //  handleAction for approve / reject
  const handleApprove = (id) => {
    // console.log(id);
    axiosSecure
      .patch(`update-asset-status/${id}?status=approved`)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Request approved!");
          refetch();
        }
      });
  };
  const handleReject = (id) => {
    // console.log(id);
    axiosSecure
      .patch(`update-asset-status/${id}?status=rejected`)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.error("Request Rejected!");
          refetch();
        }
      });
  };
  // console.log(filteredAsset);

  return (
    <div className="p-4 bg-gray-100 dark:bg-transparent min-h-screen container mx-auto">
      <Helmet>
        <title>All Requests</title>
      </Helmet>
      {/* Title and Subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-blue-500">
          All Asset Requests
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Here is the list of all asset requests from team users
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <select
            onChange={(e) => setSortOption(e.target.value)}
            className="mt-1 block w-full rounded-md border py-1 px-3 dark:bg-gray-700 dark:border-none dark:text-white dark:outline-none text-gray-900 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Sort by Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="returned">Returned</option>
          </select>
        </div>
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by requester name or email..."
            className="block w-full px-4 py-2 pl-10 pr-4 text-sm rounded-md bg-white text-gray-800 dark:bg-gray-700 dark:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      {/* Request Table */}
      {/* {isLoading && <Loader/>} */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sl no. ({allRequests.length})
              </th>
              <th scope="col" className="px-6 py-3">
                Asset Name
              </th>
              <th scope="col" className="px-6 py-3">
                Asset Type
              </th>
              <th scope="col" className="px-6 py-3">
                Email of requester
              </th>
              <th scope="col" className="px-6 py-3">
                Name of requester
              </th>
              <th scope="col" className="px-6 py-3">
                Request Date
              </th>
              <th scope="col" className="px-6 py-3">
                Additional Note
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          {/* {isLoading && isLoading && <Loader />} */}
          <tbody>
            {allRequests.map((request, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {request?.productName}
                </th>
                <td className="px-6 py-4 capitalize">
                  {request?.productType === "returnable" && (
                    <p className=" w-fit p-1 text-xs rounded-md bg-green-50 text-green-500 dark:text-green-400 dark:bg-green-700">
                      {request?.productType}
                    </p>
                  )}
                  {request?.productType === "non-returnable" && (
                    <p className=" w-fit p-1 text-xs rounded-md bg-yellow-50 text-yellow-500 dark:text-yellow-400 dark:bg-yellow-700">
                      {request?.productType}
                    </p>
                  )}
                </td>

                <td className="px-6 py-4">{request?.requesterEmail}</td>
                <td className="px-6 py-4">{request?.requesterName}</td>
                <td className="px-6 py-4">{request?.requestDate}</td>
                <td className="px-6 py-4">
                  {request?.note ? request?.note : "N/A"}
                </td>
                <td className="px-6 py-4 capitalize">
                  <span
                    className={` rounded-md px-2 py-1 text-xs
                      ${
                        request?.status === "pending" &&
                        "bg-yellow-50 text-yellow-500 dark:text-yellow-400 dark:bg-yellow-700"
                      } 
                      ${
                        request?.status === "approved" &&
                        "bg-green-50 text-green-500 dark:text-green-400 dark:bg-green-700"
                      } 
                      ${
                        request?.status === "rejected" &&
                        "bg-red-50 text-red-500 dark:text-red-300 dark:bg-red-700"
                      }`}
                  >
                    {request?.status}
                  </span>
                </td>

                <td className="px-6 py-4 flex gap-4">
                  {/* <div className="flex gap-3 justify-center"> */}
                  {request?.status === "pending" && (
                    <button
                      onClick={() => handleApprove(request?._id)}
                      disabled={!request?.status === "pending"}
                      className="bg-green-200 hover:bg-green-300 px-3 py-2 rounded-md text-green-500 hover:text-green-600 text-xl w-fit"
                    >
                      <MdOutlineDone />
                    </button>
                  )}

                  {request?.status === "approved" && (
                    <button
                      disabled={request?.status === "approved"}
                      className={`${
                        request?.status === "approved" && "cursor-not-allowed"
                      } bg-green-200 hover:bg-green-300 px-3 py-2 rounded-md text-green-500 hover:text-green-600 text-xl w-fit`}
                    >
                      <MdOutlineDoneAll />
                    </button>
                  )}

                  <button
                    onClick={() => handleReject(request?._id)}
                    disabled={
                      request?.status === "rejected" ||
                      request?.status === "approved" ||
                      request?.status === "cancelled" ||
                      request?.status === "returned"
                    }
                    className={`${
                      request?.status === "rejected" ||
                      request?.status === "approved" ||
                      request?.status === "cancelled" ||
                      request?.status === "returned"
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-red-300"
                    } bg-red-200 px-3 py-2 rounded-md text-red-500 hover:text-red-600 text-xl w-fit`}
                  >
                    <RxCross2 />
                  </button>

                  {/* </div> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
