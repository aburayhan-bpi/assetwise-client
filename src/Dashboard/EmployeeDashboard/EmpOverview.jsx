import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import moment from "moment";
import {
  MdAccessTime,
  MdOutlineCardMembership,
  MdOutlinePendingActions,
} from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { AiOutlineProduct } from "react-icons/ai";
import Chart from "../HRDashboard/Chart";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Loader from "../../components/shared/Loader";
import useMyTeam from "../../hooks/useMyTeam";
import EmpChart from "./EmpChart";
const EmpOverview = ({ user, currentUser }) => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myTeam, refetchTeam, isLoading] = useMyTeam();
  console.log(myTeam);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const res = await axiosSecure.get(
      `/emp-statistics?empEmail=${
        currentUser?.role === "employee" && user?.email
      }`
    );
    // console.log(res);
    setData(res.data?.empStats);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }
  console.log(data);
  const time = moment().format("MMMM Do YYYY, h:mm:ss a");
  return (
    <div className="mt-4">
      {/* Date and Time */}
      <div className="flex items-center justify-end mb-8">
        <div className="flex items-center justify-center bg-blue-100 pl-4">
          <h2 className="pr-3">{time}</h2>
          <div className="bg-blue-900 p-2 text-white">
            <MdAccessTime className="text-xl" />
          </div>
        </div>
      </div>
      {/* stats */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full mx-auto">
        {/* 1 */}
        <div className="bg-blue-100 dark:bg-blue-900 dark:text-white rounded-lg px-5 py-3">
          <h2 className="text-sm font-normal">Requested Assets</h2>
          <p className="text-4xl my-3 font-bold">
            {data?.requestedAssets ? data?.requestedAssets : 0}
          </p>
          <div className="flex justify-between items-center">
            <Link to="/dashboard/emp-assets">
              <p className="text-xs underline">See more</p>
            </Link>
            <div className="bg-blue-200 dark:bg-blue-900 dark:border p-2 rounded-lg">
              <AiOutlineProduct className="text-xl" />
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="bg-green-100 dark:bg-green-900 dark:text-white rounded-lg px-5 py-3">
          <h2 className="text-sm font-normal">Pending Assets</h2>
          <p className="text-4xl my-3 font-bold">
            {data?.pendingAssets ? data?.pendingAssets : 0}
          </p>
          <div className="flex justify-between items-center">
            <Link to="/dashboard/emp-assets">
              <p className="text-xs underline">See more</p>
            </Link>
            <div className="bg-blue-200 dark:bg-green-900 dark:border p-2 rounded-lg">
              <MdOutlinePendingActions className="text-xl" />
            </div>
          </div>
        </div>
        {/* 3 */}
        <div className="bg-yellow-100 dark:bg-yellow-900 dark:text-white rounded-lg px-5 py-3">
          <h2 className="text-sm font-normal">Approved Assets</h2>
          <p className="text-4xl my-3 font-bold">
            {data?.approvedAssets ? data?.approvedAssets : 0}
          </p>
          <div className="flex justify-between items-center">
            <Link to="/dashboard/emp-assets">
              <p className="text-xs underline">See more</p>
            </Link>
            <div className="bg-blue-200 dark:bg-yellow-900 dark:border p-2 rounded-lg">
              <IoCheckmarkDoneOutline className="text-xl" />
            </div>
          </div>
        </div>
        {/* 4 */}
        <div className="bg-red-100 dark:bg-red-900 dark:text-white rounded-lg px-5 py-3">
          <h2 className="text-sm font-normal">Team Members</h2>
          <p className="text-4xl my-3 font-bold">
            {myTeam.length ? myTeam.length : 0}
          </p>
          <div className="flex justify-between items-center">
            <div>
              <Link to="/dashboard/emp-team">
                <p className="text-xs underline">See more</p>
              </Link>
            </div>
            <div className="bg-blue-200 dark:bg-red-900 dark:border p-2 rounded-lg">
              <HiOutlineUserGroup className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 my-10">
        {/* Chart */}
        <div className="p-2 rounded-lg w-full">
          <EmpChart stats={data} />
        </div>
        {/* Calender */}
        <div className="p-2 dark:text-white dark:bg-gray-500 rounded-lg w-full">
          <h2 className="text-xl text-center font-semibold my-4">Calender</h2>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar className=" dark:bg-gray-500" />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default EmpOverview;
