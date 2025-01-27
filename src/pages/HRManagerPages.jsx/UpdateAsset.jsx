import { useForm } from "react-hook-form";
import { format } from "date-fns";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAsset from "../../hooks/useAsset";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
const UpdateAsset = () => {
  const axiosSecure = useAxiosSecure();
  const currentUser = useCurrentUser();
  // const [currentAsset, setCurrentAsset] = useState([]);
  const { id } = useParams();
  const assetId = id;
  //   console.log(assetId);
  const navigate = useNavigate();

  //   load asset according to id
  const { data: currentAsset } = useQuery({
    queryKey: ["currentAsset"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets/${assetId}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const currentDate = new Date();
  useEffect(() => {
    // Set initial values for the form fields using setValue
    setValue("productName", currentAsset?.productName);
    setValue("productType", currentAsset?.productType);
    setValue("productQuantity", currentAsset?.productQuantity);
  }, [currentAsset]);

  //   load asset according to id
  // useEffect(() => {
  //   axiosSecure.get(`/assets/${assetId}`).then((res) => {
  //     setCurrentAsset(res.data);
  //   });
  // }, []);

  const onSubmit = (data) => {
    const newAssetData = {
      productName: data?.productName,
      productType: data?.productType,
      productQuantity: parseInt(data?.productQuantity),
      dateAdded: format(currentDate, "yyyy-MM-dd"),
      dateUpdated: format(currentDate, "yyyy-MM-dd"),
      email: currentUser?.email,
      company: currentUser?.company,
      role: currentUser?.role,
    };

    // save updated asset info to database
    try {
      axiosSecure
        .patch(`/assets/${currentAsset?._id}`, newAssetData)
        .then((res) => {
          if (res.data.acknowledged) {
            // console.log(res.data);
            toast.success("Asset Updated successfull!");
            // reset(); // Reset the form after submission
            navigate("/asset-list");
          }
        });
    } catch (err) {
      // console.log(err);
    }

    // console.log("Updated Asset Data:", newAssetData);
  };
  // console.log(currentAsset)
  return (
    <div className="max-w-screen-md mx-auto p-6">
      <Helmet>
        <title>Update Asset</title>
      </Helmet>
      {/* Page Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Update Asset Information
        </h1>
        <p className="text-gray-600 mt-1">
          Make changes to asset details to ensure accurate and up-to-date
          records.
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name*
            </label>
            <input
              type="text"
              className={`mt-1 block w-full rounded-md border ${
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
              className="block text-sm font-medium text-gray-700"
            >
              Product Type*
            </label>
            <select
              id="productType"
              className={`mt-1 block w-full rounded-md border ${
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
              className="block text-sm font-medium text-gray-700"
            >
              Product Quantity*
            </label>
            <input
              type="number"
              className={`mt-1 block w-full rounded-md border ${
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
              Update Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAsset;
