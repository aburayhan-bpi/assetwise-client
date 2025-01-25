import { RxCross2 } from "react-icons/rx";
import { MdOutlineDone, MdOutlineDoneAll, MdSearch } from "react-icons/md";
import useAllRequests from "../../hooks/useAllRequests";
import { useEffect, useState } from "react";
import Loader from "../../components/shared/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCurrentUser from "../../hooks/useCurrentUser";
import toast from "react-hot-toast";

const AllRequests = () => {
  const [allRequests, refetch, isLoading] = useAllRequests();
  const [filteredAsset, setFilteredAsset] = useState(allRequests);
  const [searchText, setSearchText] = useState("");

  const axiosSecure = useAxiosSecure();
  const currentUser = useCurrentUser();

  // show data by default
  useEffect(() => {
    if (allRequests.length > 0) {
      setFilteredAsset(allRequests);
    }
  }, [allRequests]);

  // search based result
  useEffect(() => {
    axiosSecure.get(`all-requests?search=${searchText}`).then((res) => {
      const exactData = res.data.filter(
        (data) => data?.requesterAffiliatedWith === currentUser?.email
      );
      // console.log(exactData);
      setFilteredAsset(exactData);
      // setFilteredAsset(res.data);
    });
  }, [searchText, refetch, allRequests]);

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

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
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
      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by requester name or email..."
            className="block w-full px-4 py-2 pl-10 pr-4 text-sm rounded-md bg-white text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      {/* Request Table */}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sl no.
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
          {isLoading && isLoading && <Loader />}
          <tbody>
            {filteredAsset.map((request, index) => (
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
                    <p className=" w-fit p-1 text-xs rounded-md bg-green-50 text-green-500">
                      {request?.productType}
                    </p>
                  )}
                  {request?.productType === "non-returnable" && (
                    <p className=" w-fit p-1 text-xs rounded-md bg-yellow-50 text-yellow-500">
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
                        "bg-yellow-50 text-yellow-500"
                      } 
                      ${
                        request?.status === "approved" &&
                        "bg-green-50 text-green-500"
                      } 
                      ${
                        request?.status === "rejected" &&
                        "bg-red-50 text-red-500"
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
                      request?.status === "approved"
                    }
                    className={`${
                      request?.status === "rejected" ||
                      request?.status === "approved"
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
