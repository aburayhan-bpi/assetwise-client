import { useForm } from "react-hook-form";
import { format } from "date-fns";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAsset from "../../hooks/useAsset";
import { Helmet } from "react-helmet";
const AddAsset = () => {
  const axiosSecure = useAxiosSecure();
  const currentUser = useCurrentUser();
  // const [assets] = useAsset();
  // console.log(currentUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const currentDate = new Date();

  const onSubmit = (data) => {
    const assetData = {
      productName: data?.productName,
      productType: data?.productType,
      productQuantity: parseInt(data?.productQuantity),
      dateAdded: format(currentDate, "yyyy-MM-dd"),
      email: currentUser?.email,
      company: currentUser?.company,
      role: currentUser?.role,
    };

    // save asset to database
    try {
      axiosSecure.post("/assets", assetData).then((res) => {
        if (res.data.insertedId) {
          // console.log(res.data);
          toast.success("Asset added successful!");
          reset(); // Reset the form after submission
        }
      });
    } catch (err) {
      // console.log(err);
    }

    // console.log("Asset Data:", assetData);
  };

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <Helmet>
        <title>Add Asset</title>
      </Helmet>
      {/* Page Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Add an Asset
        </h1>
        <p className="max-w-lg mx-auto text-gray-600 dark:text-white/80 mt-1">
          Easily add new assets to your inventory and keep your records up to
          date.
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Product Name*
            </label>
            <input
              type="text"
              id="productName"
              className={`mt-1 block w-full dark:bg-gray-700 dark:border-none dark:text-white dark:outline-none
                 rounded-md border ${
                errors.productName ? "border-red-500" : "border-gray-300"
              } p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500`}
              {...register("productName", {
                required: "Product Name is required",
              })}
              placeholder="Enter product name"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productName.message}
              </p>
            )}
          </div>

          {/* Product Type */}
          <div>
            <label
              htmlFor="productType"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Product Type*
            </label>
            <select
              id="productType"
              className={`mt-1 block w-full dark:bg-gray-700 dark:border-none dark:text-white dark:outline-none rounded-md border ${
                errors.productType ? "border-red-500" : "border-gray-300"
              } p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500`}
              {...register("productType", {
                required: "Product Type is required",
              })}
            >
              <option value="">Select a type</option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-returnable</option>
            </select>
            {errors.productType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productType.message}
              </p>
            )}
          </div>

          {/* Product Quantity */}
          <div>
            <label
              htmlFor="productQuantity"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Product Quantity*
            </label>
            <input
              type="number"
              id="productQuantity"
              className={`mt-1 block w-full dark:bg-gray-700 dark:border-none dark:text-white dark:outline-none rounded-md border ${
                errors.productQuantity ? "border-red-500" : "border-gray-300"
              } p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500`}
              {...register("productQuantity", {
                required: "Product Quantity is required",
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
              })}
              placeholder="Enter product quantity"
            />
            {errors.productQuantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productQuantity.message}
              </p>
            )}
          </div>

          {/* Add Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 ease-in-out"
            >
              Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
