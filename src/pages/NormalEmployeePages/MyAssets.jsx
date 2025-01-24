import { useState } from "react";
import useEmpReqAssets from "../../hooks/useEmpReqAssets";

const MyAssets = () => {
  const [myReqAssets, refetch, isLoading] = useEmpReqAssets();
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");
  console.log(myReqAssets);
  // show search based result
  // useEffect(() => {
  //   axiosSecure.get(`/my-hr-assets?search=${searchText}`).then((res) => {
  //     const exactData = res.data.filter(
  //       (data) => data?.email === currentUser?.affiliatedWith
  //     );
  //     setFilteredAsset(exactData);
  //   });
  // }, [searchText, refetch, hrAssets]);

  // Example data (replace this with dynamic data from server)
  const assets = [
    {
      name: "Laptop",
      type: "Returnable",
      requestDate: "Jan 1, 2025",
      approvalDate: "Jan 5, 2025",
      status: "Approved",
    },
    {
      name: "Keyboard",
      type: "Non-returnable",
      requestDate: "Jan 3, 2025",
      approvalDate: "Pending",
      status: "Pending",
    },
  ];

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

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        {/* Search Bar */}
        <input
          type="text"
          onChange={(e) => searchText(e.target.value)}
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
            {assets.map((asset, index) => (
              <tr key={index}>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.requestDate}</td>
                <td>{asset.approvalDate}</td>
                <td>
                  <span
                    className={`badge ${
                      asset.status === "Approved"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {asset.status}
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
