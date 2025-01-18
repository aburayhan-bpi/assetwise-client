import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import lottieAnimation from "../../public/register.json";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import imageUpload from "../hooks/imageUpload";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const JoinHRManager = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { createUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedPackage, setSelectedPackage] = useState("5");

  const onSubmit = async (data) => {
    const companyPhoto = await imageUpload(data?.companyLogo[0]);

    const hrInfo = {
      name: data?.name,
      company: data?.companyName,
      email: data?.email,
      birthdate: data?.birthdate,
      companyPhoto,
      package: parseInt(data?.package),
      // limit: parseInt(20),
      role: "hr",
    };

    // create user
    createUser(data?.email, data?.password)
      .then((result) => {
        updateUserProfile(hrInfo?.name, hrInfo?.companyPhoto)
          .then((result) => {
            console.log(result);

            // save hr users to db
            axiosPublic.post("/hr", hrInfo).then((res) => {
              if (res.data?.insertedId) {
                toast.success("HR Account Created!");

                reset();
                navigate("/payment");
              }
            });
          })
          .catch((err) => {
            console.log("update failed", err.message);
          });
      })
      .catch((err) => {
        console.log("user create failed", err.message);
        if (err.code === "auth/email-already-in-use") {
          toast.error("User already exist!");
        } else {
          console.log("something wrong:::", err.message);
        }
      });

    console.log(hrInfo);

    // Redirect to payment page or handle payment here
    // navigate("/payment");
  };

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
  };

  return (
    <div className="max-w-screen-xl mx-auto lg:flex justify-center items-center my-10">
      <section className="md:w-[70%] lg:w-[50%] mx-auto">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Join as HR Manager
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...register("name", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your full name"
                    required=""
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      Full Name is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="companyName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company Name*
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    {...register("companyName", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your company name"
                    required=""
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm">
                      Company Name is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="companyLogo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Company Logo*
                  </label>
                  <input
                    type="file"
                    name="companyLogo"
                    {...register("companyLogo", { required: true })}
                    className="file-input file-input-bordered file-input-sm w-full h-11"
                  />
                  {errors.companyLogo && (
                    <p className="text-red-500 text-sm">
                      Company Logo is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@example.com"
                    required=""
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">Email is required</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password*
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    {...register("password", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••"
                    required=""
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">Password is required</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="birthdate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date of Birth*
                  </label>
                  <input
                    type="date"
                    name="birthdate"
                    {...register("birthdate", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                  {errors.birthdate && (
                    <p className="text-red-500 text-sm">
                      Birthdate is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="package"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select a Package*
                  </label>
                  <select
                    name="package"
                    id="package"
                    {...register("package", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    defaultValue="5"
                  >
                    <option value="5">5 Members - $5</option>
                    <option value="8">10 Members - $8</option>
                    <option value="15">20 Members - $15</option>
                  </select>
                  {errors.package && (
                    <p className="text-red-500 text-sm">
                      Package selection is required
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-400 text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="hidden lg:block">
        <Lottie
          animationData={lottieAnimation}
          style={{ width: "600px", height: "600px" }}
        ></Lottie>
      </section>
    </div>
  );
};

export default JoinHRManager;
