import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

const LargeBanner = React.lazy(() => import("./uicomponents/LargeBanner.jsx"));
const Sponsors = React.lazy(() => import("./uicomponents/Sponsors"));
const JobCategory = React.lazy(() => import("./uicomponents/JobCategory"));
const FeaturedJob = React.lazy(() => import("./uicomponents/FeaturedJob"));
const Footer = React.lazy(() => import("./uicomponents/Footer"));

const LatestJob = React.lazy(() => import("./uicomponents/Latestjob.jsx"));

function App() {
  return (
    <>
      <div className="bg-[url('https://jobify-web-api.onrender.com/images/background.png')] bg-cover bg-center w-full h-screen">
        <div className="absolute top-[15%] md:top-[5%] ">
          <LargeBanner />
        </div>
      </div>
      <div>
        <Sponsors />
      </div>
      <div>
        <JobCategory />
      </div>
      <div>
        <FeaturedJob />
      </div>
      <div>
        <div>
          <LatestJob />
        </div>
        <Footer />
      </div>

      <Outlet />
    </>
  );
}

export default App;
