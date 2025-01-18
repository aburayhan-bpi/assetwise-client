import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import lottieAnimation from "../../public/login.json";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "../components/shared/Loader";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user, loginUser, loading, setLoading, googleRegister } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const from = location?.state?.from?.pathname || "/";
  if (loading) return <Loader />;
  if (user) return <Navigate to={from} replace={true} />;

  const onSubmit = async (data) => {
    setError("");

    loginUser(data?.email, data?.password)
      .then((result) => {
        console.log(result);
        toast.success("Login successfull!");
        navigate(from, { replace: true });
        navigate("/");
      })
      .catch((err) => {
        if (err.code === "auth/invalid-credential") {
          setError("Please provide valid credentails!");
          setLoading(false);
        } else {
          console.log("something wrong:::", err.message);
        }
      });
    console.log(data);
  };
  const googleSignIn = async () => {
    try {
      googleRegister().then(async (result) => {
        console.log(result);
        toast.success("Login Successfull!");
        navigate("/");

        const employeeInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          birthdate: result.user?.birthdate || "Not provided",
          photo: result.user?.photoURL,
          role: "employee",
        };

        // Save user to database
        await axiosPublic.post("/employee", employeeInfo);

        // if (response.data) {
        // }
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto lg:flex justify-center items-center">
      <section className="md:w-[60%] lg:w-[40%] mx-auto">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log in to your account!
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
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-400 text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
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

              <div className=" text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <div className="flex flex-col mt-1">
                  {" "}
                  <Link
                    to="/join-employee"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Join as Employee
                  </Link>
                  <Link
                    to="/join-hr"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Join as HR
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="hidden lg:block">
        <Lottie
          animationData={lottieAnimation}
          style={{ width: "500px", height: "500px" }}
        ></Lottie>
      </section>
    </div>
  );
};

export default Login;
