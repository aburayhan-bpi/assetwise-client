import { useEffect, useState } from "react";
import useEmpReqAssets from "../../hooks/useEmpReqAssets";
import useCurrentUser from "../../hooks/useCurrentUser";
import Loader from "../../components/shared/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaPrint } from "react-icons/fa";
import AssetPrintDocument from "./AssetPrintDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ClipLoader, ScaleLoader } from "react-spinners";
import { RxCross2 } from "react-icons/rx";
import { IoMdReturnLeft } from "react-icons/io";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const MyAssets = () => {
  // const [filteredAsset, setFilteredAsset] = useState(myReqAssets);
  const axiosSecure = useAxiosSecure();
  const currentUser = useCurrentUser();

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [myReqAssets, refetch, isLoading] = useEmpReqAssets(
    searchText,
    filterOption
  );
  const [companyInfo, setCompanyInfo] = useState(null);
  // console.log(filteredAsset);

  // useEffect(() => {
  //   if (myReqAssets.length > 0) {
  //     setFilteredAsset(myReqAssets);
  //   }
  // }, [myReqAssets]);

  // // show search based result
  // useEffect(() => {
  //   axiosSecure.get(`my-req-assets?search=${searchText}`).then((res) => {
  //     const exactData = res.data.filter(
  //       (data) => data?.requesterEmail === currentUser?.email
  //     );
  //     setFilteredAsset(exactData);
  //     // setFilteredAsset(res.data);
  //   });
  // }, [searchText, refetch, myReqAssets]);

  // // filter based result
  // useEffect(() => {
  //   axiosSecure
  //     .get(`my-req-assets?filterOption=${filterOption}`)
  //     .then((res) => {
  //       const exactData = res.data.filter(
  //         (data) => data?.requesterEmail === currentUser?.email
  //       );
  //       setFilteredAsset(exactData);
  //       // setFilteredAsset(res.data);
  //     });
  // }, [filterOption, refetch, myReqAssets]);

  // get company info
  useEffect(() => {
    axiosSecure
      .get(`company-details?email=${currentUser?.affiliatedWith}`)
      .then((res) => {
        // console.log(res.data);
        setCompanyInfo(res.data);
      });
  }, [currentUser, myReqAssets, refetch]);

  // cancel asset
  const handleCancel = (assetId, reqAssetId) => {
    // Send the request to cancel the asset
    axiosSecure
      .patch(`/cancel-request/${assetId}?reqAssetId=${reqAssetId}`)
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Cancelled asset request!");
          refetch();
          // Update filteredAsset state after cancellation
          // setFilteredAsset((prevAssets) =>
          //   prevAssets.map((asset) =>
          //     asset._id === reqAssetId
          //       ? {
          //           ...asset,
          //           status: "cancelled",
          //           cancelledDate: new Date().toISOString(),
          //         }
          //       : asset
          //   )
          // );
        }
      })
      .catch((err) => {
        toast.error("Error cancelling asset request!");
        // console.error(err);
      });
  };

  // return asset
  const handleReturn = (assetId, reqAssetId) => {
    // Send the request to return the asset
    axiosSecure
      .patch(`/return-request/${assetId}?reqAssetId=${reqAssetId}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Asset request returned!");
          refetch();
          // Update filteredAsset state after return
          // setFilteredAsset((prevAssets) =>
          //   prevAssets.map((asset) =>
          //     asset._id === reqAssetId
          //       ? { ...asset, status: "returned" }
          //       : asset
          //   )
          // );
        }
      })
      .catch((err) => {
        toast.error("Error returning asset request!");
        // console.error(err);
      });
  };

  // console.log(companyInfo)
  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-gray-50 min-h-screen">
      <Helmet>
        <title>My Assets</title>
      </Helmet>
      {/* Title and Subtitle */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          My Requested Assets
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Easily track your asset requests and their current status.
        </p>
      </div>
      {myReqAssets && (
        <h2 className="font-semibold mb-2">
          Total Assets: ({myReqAssets.length})
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
            {myReqAssets.length === 0 && !isLoading && (
              <p>No assets found for the selected criteria.</p>
            )}

            {myReqAssets.map((asset, index) => (
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
                      asset?.status === "approved"
                        ? "bg-green-100 text-green-500 capitalize text-xs"
                        : asset?.status === "rejected"
                        ? "bg-red-100 text-red-500 text-xs capitalize"
                        : asset?.status === "returned"
                        ? "bg-violet-100 text-violet-500 text-xs capitalize"
                        : "bg-yellow-100 text-yellow-700 text-xs capitalize"
                    }`}
                  >
                    {asset?.status ? asset?.status : "N/A"}
                  </span>
                </td>
                <td>
                  {asset?.status === "approved" ? (
                    <div className="flex items-center">
                      <PDFDownloadLink
                        document={
                          <AssetPrintDocument
                            asset={asset}
                            companyInfo={companyInfo}
                          />
                        }
                        fileName={`${asset.productName}-details.pdf`}
                      >
                        {({ loading }) =>
                          loading ? (
                            <ClipLoader />
                          ) : (
                            <button className="flex items-center justify-center gap-2 bg-blue-100 text-blue-500 hover:bg-blue-200 px-2 py-1 rounded-md transition-all duration-200">
                              <FaPrint size={20} />
                            </button>
                          )
                        }
                      </PDFDownloadLink>
                      {asset?.productType === "returnable" && (
                        <button
                          onClick={() =>
                            handleReturn(asset?.assetId, asset?._id)
                          }
                          disabled={asset?.status === "returned"}
                          className={`${
                            asset?.status === "returned" && "cursor-not-allowed"
                          } bg-red-100 text-red-500 ml-2 px-2 py-1 rounded-md hover:bg-red-200 transition-all duration-200`}
                        >
                          Return
                        </button>
                      )}
                    </div>
                  ) : asset?.status === "pending" ? (
                    <div>
                      <button
                        onClick={() => handleCancel(asset?.assetId, asset?._id)}
                        className="bg-red-100 px-2 py-1 rounded-md text-red-500 hover:bg-red-200 w-fit transition-all duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : asset?.status === "cancelled" ? (
                    <h2 className="bg-yellow-100 text-yellow-700 w-fit px-2 py-1 text-xs rounded-xl">
                      Cancelled
                    </h2>
                  ) : asset?.status === "returned" ? (
                    <h2 className="bg-violet-100 text-violet-500 w-fit px-2 py-1 text-xs rounded-xl">
                      Returned
                    </h2>
                  ) : (
                    <h2 className="bg-red-100 text-red-500 w-fit px-2 py-1 text-xs rounded-xl">
                      Rejected
                    </h2>
                  )}
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
