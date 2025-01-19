import Swal from "sweetalert2";
import Loader from "../../components/shared/Loader";
import useAsset from "../../hooks/useAsset";
import useAuth from "../../hooks/useAuth";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AssetList = () => {
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  const [assets, refetch, isLoading] = useAsset();
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    console.log(id);
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
          console.log(res.data);
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
          Asset Inventory - ({assets.length})
        </h1>
        <p className="text-lg text-gray-600">
          A comprehensive overview of all assets managed within the
          organization.
        </p>
      </div>
      {/* Asset info table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sl No.
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
              assets.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-red-500 text-md">
                    No Asset Available
                  </td>
                </tr>
              ) : (
                assets.map((asset, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {asset.productName}
                    </th>
                    <td className="px-6 py-4 capitalize">
                      {asset.productType}
                    </td>

                    <td className="px-6 py-4">{asset.productQuantity}</td>

                    <td className="px-6 py-4">{asset.dateAdded}</td>

                    <td className="px-6 py-4 flex gap-2">
                      <button className="font-medium bg-blue-50 hover:bg-blue-100 px-3 rounded-md text-blue-600 dark:text-blue-500 transition-all duration-200">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(asset?._id)}
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
  );
};

export default AssetList;
