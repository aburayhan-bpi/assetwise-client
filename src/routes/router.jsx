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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
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
      {
        path: "profile",
        element: (
          <ProfileRoute>
            <Profile />
          </ProfileRoute>
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
]);
