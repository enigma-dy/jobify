import React from "react";
import { Suspense } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import LoadingUI from "./utility/loadingUI.jsx";

const Layout = React.lazy(() => import("./uicomponents/Layout.jsx"));
const ErrorPage = React.lazy(() => import("./pages/GlobalError.jsx"));
const AllJob = React.lazy(() => import("./pages/JobListing.jsx"));
const Employers = React.lazy(() => import("./pages/Employers.jsx"));
const Pricing = React.lazy(() => import("./pages/Pricing.jsx"));
const CustomerSupport = React.lazy(() => import("./pages/CustomerSupport.jsx"));
const Profile = React.lazy(() => import("./pages/Profile.jsx"));
const SignupPage = React.lazy(() => import("./pages/SignupPage.jsx"));
const JobDetail = React.lazy(() => import("./pages/Jobdetails.jsx"));
const Application = React.lazy(() => import("./pages/ApplicationForm.jsx"));
const LoginPage = React.lazy(() => import("./pages/MobileLoginPage.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingUI />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "jobs",
        element: <AllJob />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "employers",
        element: <Employers />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "support",
        element: <CustomerSupport />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "/jobs/:id",
        element: <JobDetail />,
      },
      {
        path: "/jobs/:id/apply",
        element: <Application />,
      },
    ],
    errorElement: (
      <Suspense fallback={<LoadingUI />}>
        <ErrorPage />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingUI />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
