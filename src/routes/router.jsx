import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import JoinEmployee from "../pages/JoinEmployee";
import Login from "../pages/Login";
import JoinHRManager from "../pages/JoinHRManager";
import Home from "../pages/Home";
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
        element: <MyAssets />,
      },
      {
        path: "my-team",
        element: <MyTeam />,
      },
      {
        path: "request-asset",
        element: <RequestAsset />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      // for HR Manager routes
      {
        path: "asset-list",
        element: <AssetList />,
      },
      {
        path: "add-asset",
        element: <AddAsset />,
      },
      {
        path: "all-requests",
        element: <AllRequests />,
      },
      {
        path: "my-employee-list",
        element: <MyEmployeeList />,
      },
      {
        path: "add-employee",
        element: <AddEmployee />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
    ],
  },
]);
