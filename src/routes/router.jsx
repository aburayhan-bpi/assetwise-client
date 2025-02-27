import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import JoinEmployee from "../pages/JoinEmployee";
import Login from "../pages/Login";
import JoinHRManager from "../pages/JoinHRManager";
import Home from "../pages/Home/Home";
import MyAssets from "../pages/NormalEmployeePages/MyAssets";
import MyTeam from "../pages/NormalEmployeePages/MyTeam";
import RequestAsset from "../pages/NormalEmployeePages/RequestAsset";
import Profile from "../pages/Profile";
import AssetList from "../pages/HRManagerPages.jsx/AssetList";
import AddAsset from "../pages/HRManagerPages.jsx/AddAsset";
import AllRequests from "../pages/HRManagerPages.jsx/AllRequests";
import MyEmployeeList from "../pages/HRManagerPages.jsx/MyEmployeeList";
import AddEmployee from "../pages/HRManagerPages.jsx/AddEmployee";
import Payment from "../pages/Payment/Payment";
import UpdateAsset from "../pages/HRManagerPages.jsx/UpdateAsset";
import IncreaseLimit from "../pages/payment/IncreaseLimitPayment/IncreaseLimit";
import EmployeeRoute from "./EmployeeRoute";
import ProfileRoute from "./ProfileRoute";
import HRRoute from "./HRRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Employees from "../Dashboard/HRDashboard/Employees";
import Request from "../Dashboard/EmployeeDashboard/Request";

import Assets from "../Dashboard/HRDashboard/Assets";
import AddAssets from "../Dashboard/HRDashboard/AddAssets";
import MyAllRequests from "../Dashboard/HRDashboard/MyAllRequests";
import Overview from "../Dashboard/Overview";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "join-employee",
        element: <JoinEmployee />,
      },
      {
        path: "join-hr",
        element: <JoinHRManager />,
      },
      {
        path: "login",
        element: <Login />,
      },

      // for normal employee routes
      {
        path: "my-assets",
        element: (
          <EmployeeRoute>
            <MyAssets />
          </EmployeeRoute>
        ),
      },
      {
        path: "my-team",
        element: (
          <EmployeeRoute>
            <MyTeam />
          </EmployeeRoute>
        ),
      },
      {
        path: "request-asset",
        element: (
          <EmployeeRoute>
            <RequestAsset />
          </EmployeeRoute>
        ),
      },

      // for HR Manager routes
      {
        path: "asset-list",
        element: (
          <HRRoute>
            <AssetList />
          </HRRoute>
        ),
      },
      {
        path: "add-asset",
        element: (
          <HRRoute>
            <AddAsset />
          </HRRoute>
        ),
      },
      {
        path: "all-requests",
        element: (
          <HRRoute>
            <AllRequests />
          </HRRoute>
        ),
      },
      {
        path: "my-employee-list",
        element: (
          <HRRoute>
            <MyEmployeeList />
          </HRRoute>
        ),
      },
      {
        path: "add-employee",
        element: (
          <HRRoute>
            <AddEmployee />
          </HRRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <HRRoute>
            <UpdateAsset />
          </HRRoute>
        ),
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "increase-limit",
        element: <IncreaseLimit />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        path: "/dashboard",
        element: <Overview />,
      },
      {
        path: "/dashboard/assets",
        element: <Assets />,
      },
      {
        path: "/dashboard/add-assets",
        element: <AddAssets />,
      },
      {
        path: "/dashboard/all-requests",
        element: (
          <HRRoute>
            <MyAllRequests />
          </HRRoute>
        ),
      },
      {
        path: "/dashboard/employees",
        element: (
          <HRRoute>
            <MyEmployeeList />
          </HRRoute>
        ),
      },
      {
        path: "/dashboard/add-employees",
        element: (
          <HRRoute>
            <AddEmployee />
          </HRRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <ProfileRoute>
            <Profile />
          </ProfileRoute>
        ),
      },
      // employee dashboard routes
      {
        path: "/dashboard/emp-assets",
        element: (
          <EmployeeRoute>
            <MyAssets />
          </EmployeeRoute>
        ),
      },
      {
        path: "/dashboard/emp-team",
        element: (
          <EmployeeRoute>
            <MyTeam />
          </EmployeeRoute>
        ),
      },
      {
        path: "/dashboard/request-asset",
        element: (
          <EmployeeRoute>
            <RequestAsset />
          </EmployeeRoute>
        ),
      },
    ],
  },
]);
