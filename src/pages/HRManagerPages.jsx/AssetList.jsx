import Swal from "sweetalert2";
import Loader from "../../components/shared/Loader";
import useAsset from "../../hooks/useAsset";
import useAuth from "../../hooks/useAuth";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AssetList = () => {
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  const [assets, refetch, isLoading] = useAsset();
  console.log(assets);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  // search state
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [sortOption, setSortOption] = useState("");
  console.log(sortOption);
  const [filteredAsset, setFilteredAsset] = useState(assets);
  // console.log(searchText);

  // show search based result
  useEffect(() => {
    axiosSecure.get(`/assets?search=${searchText}`).then((res) => {
      setFilteredAsset(res.data);
    });
  }, [searchText, refetch, assets]);

  // show search based filter
  useEffect(() => {
    axiosSecure.get(`/assets?filterOption=${filterOption}`).then((res) => {
      setFilteredAsset(res.data);
    });
  }, [filterOption, refetch, assets]);

  useEffect(() => {
    axiosSecure.get(`/assets?sortOption=${sortOption}`).then((res) => {
      setFilteredAsset(res.data);
    });
  }, [sortOption, refetch, assets]);

  const handleDelete = (id) => {
    // console.log(id);
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
        // delete asset from databae

        axiosSecure.delete(`/assets/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Asset has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  // show loader while data is loadingg
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Asset Inventory
        </h1>
        <p className="text-lg text-gray-600">
          A comprehensive overview of all assets managed within the
          organization.
        </p>
      </div>
      {/* Asset info table */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {/* Search box */}
          <div>
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              className="mt-1 block w-full rounded-md border p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by names"
            />
          </div>
          {/* Filter box */}
          <div>
            <select
              id="productType"
              onChange={(e) => setFilterOption(e.target.value)}
              className="mt-1 block w-full rounded-md border p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Search by filter</option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-returnable</option>
              <option value="available">Available</option>
              <option value="stock-out">Stock Out</option>
            </select>
          </div>
          {/* Sort box */}
          <div>
            <select
              id="productType"
              onChange={(e) => setSortOption(e.target.value)}
              className="mt-1 block w-full rounded-md border p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sort by Quantity</option>
              <option value="asc">
                Ascending <span>(low-high)</span>
              </option>
              <option value="desc">
                Descending <span>(high-low)</span>
              </option>
            </select>
          </div>
        </div>
        {/* table start here */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sl No.{" "}
                  <span className="text-gray-600">
                    ({filteredAsset.length})
                  </span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Added
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {user && currentUser?.role === "hr" ? (
                filteredAsset.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-red-500 text-md"
                    >
                      No Asset Available
                    </td>
                  </tr>
                ) : (
                  filteredAsset.map((filteredAsset, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {filteredAsset?.productName}
                      </th>
                      <td className="px-6 py-4 capitalize">
                        {filteredAsset?.productType === "returnable" && (
                          <p className=" w-fit p-1 text-xs rounded-md bg-green-50 text-green-500">
                            {filteredAsset?.productType}
                          </p>
                        )}
                        {filteredAsset?.productType === "non-returnable" && (
                          <p className=" w-fit p-1 text-xs rounded-md bg-yellow-50 text-yellow-500">
                            {filteredAsset?.productType}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {filteredAsset?.productQuantity}
                      </td>

                      <td className="px-6 py-4">{filteredAsset?.dateAdded}</td>

                      <td className="px-6 py-4 flex gap-2">
                        <button className="font-medium bg-blue-50 hover:bg-blue-100 px-3 rounded-md text-blue-600 dark:text-blue-500 transition-all duration-200">
                          <Link to={`/update/${filteredAsset?._id}`}>Edit</Link>
                        </button>
                        <button
                          onClick={() => handleDelete(filteredAsset?._id)}
                          className="font-medium bg-red-50 hover:bg-red-100 p-1 rounded-md text-red-600 dark:text-red-500 transition-all duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-red-500 text-md">
                    Expected user not found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetList;
