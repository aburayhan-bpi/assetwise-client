import { useEffect, useState } from "react";
import useMyHRAssets from "../../hooks/useMyHRAssets";
import useAuth from "../../hooks/useAuth";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import moment from "moment";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loader from "../../components/shared/Loader";

const RequestAsset = () => {
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  const axiosSecure = useAxiosSecure();
  const [hrAssets, refetch, isLoading] = useMyHRAssets();
  const [filteredAsset, setFilteredAsset] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [noteText, setNoteText] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  // console.log(filteredAsset);

  useEffect(() => {
    if (hrAssets.length > 0) {
      setFilteredAsset(hrAssets);
    }
  }, [hrAssets]);

  // show search based result
  useEffect(() => {
    axiosSecure.get(`assets?search=${searchText}`).then((res) => {
      const exactData = res.data.filter(
        (data) => data?.email === currentUser?.affiliatedWith
      );
      setFilteredAsset(exactData);
    });
  }, [searchText, refetch, hrAssets]);

  useEffect(() => {
    axiosSecure.get(`/assets?filterOption=${filterOption}`).then((res) => {
      const exactData = res.data.filter(
        (data) => data?.email === currentUser?.affiliatedWith
      );
      setFilteredAsset(exactData);
    });
  }, [filterOption, refetch, hrAssets]);

  const handleRequestModal = (asset) => {
    setNoteText("");
    setSelectedAsset(asset);
    document.getElementById("my_modal_5").showModal();
    document.getElementById("note").blur();
  };
  const handleCloseModal = () => {
    document.getElementById("my_modal_5").close();
  };

  const requestAsset = () => {
    setNoteText("");
    if (!selectedAsset) return;

    const requestedAssetData = {
      assetId: selectedAsset?._id,
      productName: selectedAsset?.productName,
      productType: selectedAsset?.productType,
      note: noteText,
      requesterId: currentUser?._id,
      requesterName: currentUser?.name,
      requesterEmail: currentUser?.email,
      requestDate: moment().format("YYYY-MM-DD"),
      status: "pending",
      requesterAffiliatedWith: currentUser?.affiliatedWith,
    };

    try {
      if (currentUser && requestedAssetData) {
        // console.log(requestedAssetData);

        axiosSecure
          .post(`/request-asset/${currentUser?.email}`, requestedAssetData)
          .then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              Swal.fire({
                title: "Requested!",
                text: "Asset request has been success!",
                icon: "success",
              });
              refetch();
            }
          });
      }
    } catch (err) {
      // console.log(err);
    }

    document.getElementById("my_modal_5").close();
  };
  // console.log(selectedAsset);
  // console.log(currentUser);
  return (
    <div>
      <div className="p-8 bg-gray-100 min-h-screen">
        {/* Title and Subtitle Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-600">Asset Request</h1>
          <p className="text-xl text-gray-600 mt-2">
            Easily search, filter, and request assets that suit your needs.
          </p>
        </div>

        <div className="grid mb-6 grid-cols-1 md:grid-cols-3 gap-5 w-full">
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
        </div>
        {isLoading && <Loader />}
        {/* Assets Section */}
        {user && currentUser?.role === "employee" ? (
          filteredAsset.length === 0 ? (
            <div colSpan="5" className="text-center text-red-500 text-md">
              No Asset Available
            </div>
          ) : (
            filteredAsset.map((singleAsset, index) => (
              <div key={index} className="space-y-6 mb-3">
                <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">
                      {singleAsset?.productName}
                    </span>
                    <span className="text-sm text-gray-500">
                      <p
                        className={`${
                          singleAsset?.productType === "returnable"
                            ? "p-1 rounded-md bg-green-50 text-green-500 w-fit text-xs capitalize font-semibold"
                            : "p-1 rounded-md bg-yellow-50 text-yellow-500 w-fit text-xs capitalize font-semibold"
                        }`}
                      >
                        {singleAsset?.productType}
                      </p>
                    </span>
                    <span className="flex items-center gap-1">
                      <p className="mt-1">
                        {" "}
                        {singleAsset?.productQuantity <= 0 ? (
                          <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                            Out of stock
                          </span>
                        ) : (
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            Stock available: {singleAsset?.productQuantity}
                          </span>
                        )}
                      </p>
                    </span>
                  </div>
                  <button
                    disabled={singleAsset?.productQuantity <= 0}
                    onClick={() => handleRequestModal(singleAsset)}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Request
                  </button>
                  {/* modal */}
                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      {/* Modal Header */}
                      <h3 className="text-lg font-bold text-center mb-4">
                        Request Asset
                      </h3>

                      {/* Note Input */}
                      <div className="mb-4">
                        <label
                          htmlFor="note"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Add a Note
                        </label>
                        <textarea
                          id="note"
                          placeholder="Enter your note here..."
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          rows="4"
                        ></textarea>
                      </div>

                      {/* Action Buttons */}
                      <div className="modal-action flex justify-between">
                        {/* Cancel Button */}
                        <button
                          className="btn rounded-md bg-red-500 text-white hover:bg-red-600"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>

                        {/* Request Button */}
                        <button
                          onClick={requestAsset}
                          className="btn rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        >
                          Request
                        </button>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            ))
          )
        ) : (
          <div className="text-center text-red-500 text-md">
            Expected user not found!
            {/* <Loader/> */}
          </div>
        )}
      </div>
      {/* modal */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        open modal
      </button> */}
    </div>
  );
};

export default RequestAsset;
