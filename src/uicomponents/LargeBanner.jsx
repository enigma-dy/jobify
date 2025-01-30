import React from "react";
import SearchComponent from "./SearchComponent";

const LargeBanner = () => {
  return (
    <div className="mt-8 space-y-4 p-4 md:mt-16 md:space-y-8">
      <div>
        <h1 className="text-xl md:text-5xl text-blue-600 flex flex-col gap-2 md:gap-8 w-full">
          Discover More Than <span className="text-blue-400">5000+ Jobs</span>
        </h1>
        <p className="w-full md:w-[400px] text-sm md:text-base text-[#FCCB06] pt-8">
          Great platform for job seekers exploring new career paths and
          passionate about startups
        </p>
      </div>
      <div className="w-full md:w-[800px] lg:w-[1200px] overflow-hidden">
        <SearchComponent />
      </div>
    </div>
  );
};

export default LargeBanner;
