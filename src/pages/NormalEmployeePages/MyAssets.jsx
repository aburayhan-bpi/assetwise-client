import { useEffect, useState } from "react";
import useEmpReqAssets from "../../hooks/useEmpReqAssets";
import useCurrentUser from "../../hooks/useCurrentUser";
import Loader from "../../components/shared/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyAssets = () => {
  const [myReqAssets, refetch, isLoading] = useEmpReqAssets();
  const [filteredAsset, setFilteredAsset] = useState(myReqAssets);
  const axiosSecure = useAxiosSecure();
  const currentUser = useCurrentUser();

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");
  // console.log(filteredAsset);

  useEffect(() => {
    if (myReqAssets.length > 0) {
      setFilteredAsset(myReqAssets);
    }
  }, [myReqAssets]);

  // show search based result
  useEffect(() => {
    axiosSecure.get(`my-req-assets?search=${searchText}`).then((res) => {
      const exactData = res.data.filter(
        (data) => data?.requesterEmail === currentUser?.email
      );
      setFilteredAsset(exactData);
      // setFilteredAsset(res.data);
    });
  }, [searchText, refetch, myReqAssets]);

  // filter based result
  useEffect(() => {
    axiosSecure
      .get(`my-req-assets?filterOption=${filterOption}`)
      .then((res) => {
        const exactData = res.data.filter(
          (data) => data?.requesterEmail === currentUser?.email
        );
        setFilteredAsset(exactData);
        // setFilteredAsset(res.data);
      });
  }, [filterOption, refetch, myReqAssets]);

  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Title and Subtitle */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          My Requested Assets
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Easily track your asset requests and their current status.
        </p>
      </div>
      {filteredAsset && (
        <h2 className="font-semibold mb-2">
          Total Assets: ({filteredAsset.length})
        </h2>
      )}
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        {/* Search Bar */}

        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by asset name"
          className="input input-bordered w-full md:w-1/3"
        />

        {/* Filter by Asset Type */}
        <select
          onChange={(e) => setFilterOption(e.target.value)}
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="">Filter by Asset Type</option>
          <option value="returnable">Returnable</option>
          <option value="non-returnable">Non-returnable</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>
      {/* Assets Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Type</th>
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Table Body */}

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="6">
                  <Loader />
                </td>
              </tr>
            )}
            {filteredAsset.map((asset, index) => (
              <tr key={index}>
                <td>{asset?.productName}</td>
                <td>
                  <p
                    className={`${
                      asset?.productType === "returnable"
                        ? "text-green-600 bg-green-100 w-fit p-1 rounded-lg text-xs capitalize"
                        : "text-yellow-600 bg-yellow-100 w-fit p-1 rounded-lg text-xs capitalize"
                    }`}
                  >
                    {asset?.productType}
                  </p>
                </td>
                <td>{asset?.requestDate}</td>
                <td>{asset?.approvalDate ? asset?.approvalDate : "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      asset?.status === "Approved"
                        ? "badge-success capitalize"
                        : "badge-warning capitalize"
                    }`}
                  >
                    {asset?.status ? asset?.status : "N/A"}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-primary">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssets;
