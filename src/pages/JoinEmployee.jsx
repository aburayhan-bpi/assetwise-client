import Lottie from "lottie-react";
import lottieAnimation from "../../public/register.json";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import imageUpload from "../hooks/imageUpload";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const JoinEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, googleRegister, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const photo = await imageUpload(data?.photo[0]);
    const employeeInfo = {
      name: data?.name,
      email: data?.email,
      birthdate: data?.birthdate,
      photo,
      role: "employee",
    };
    console.log(employeeInfo);

    // create user
    createUser(data?.email, data?.password)
      .then((result) => {
        console.log(result);
        updateUserProfile(employeeInfo?.name, employeeInfo?.photo)
          .then((result) => {
            console.log(result);
            // save user to db
            axiosPublic.post("/employee", employeeInfo).then((result) => {
              console.log(result);
              if (result.data.insertedId) {
                toast.success("Successfully created employee account!");
                // reset();
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
  };
  // google register
  const googleSignIn = async () => {
    try {
      const result = await googleRegister();
      console.log(result);

      const employeeInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        birthdate: result.user?.birthdate || "Not provided",
        photo: result.user?.photoURL,
        role: "employee",
      };

      // Save user to database
      const response = await axiosPublic.post("/employee", employeeInfo);

      if (response.data.insertedId) {
        toast.success("SignUp Successfull!");
        navigate("/");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error(error.response.data?.message || "Something went wrong");
      } else {
        console.error("Error during employee creation:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto lg:flex justify-center items-center my-10">
      <section className="md:w-[70%] lg:w-[50%] mx-auto">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Join as Employee
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="text"
                    {...register("name", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your name"
                    required=""
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">Name is required</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    required=""
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">Email is required</p>
                  )}
                </div>
                <div className="md:flex gap-4 items-center justify-center">
                  <div className="mb-5 md:mb-0 md:w-1/2">
                    <label>Birthdate*</label>
                    <input
                      type="date"
                      name="birthdate"
                      {...register("birthdate", { required: true })}
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@gmail.com"
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
                      htmlFor="photo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Upload Profile Photo*
                    </label>
                    <input
                      type="file"
                      name="photo"
                      {...register("photo", { required: true })}
                      className="file-input file-input-bordered file-input-sm w-full h-11"
                    />
                    {errors.photo && (
                      <p className="text-red-500 text-sm">Photo is required</p>
                    )}
                  </div>
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
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">Password is required</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-400 text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
              </form>
              <div className="divider">OR</div>
              <div>
                <button
                  onClick={googleSignIn}
                  className="btn w-full bg-transparent border"
                >
                  <FcGoogle className="size-7" />
                  Sign in with Google
                </button>
              </div>
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

export default JoinEmployee;
