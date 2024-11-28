import React from "react";

const Hero = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src="https://jobify-web-api.onrender.com/images/hero.png"
        alt="Hero Banner"
        className="absolute bottom-0-0 left-0 w-full h-full object-contain"
      />
    </div>
  );
};

export default Hero;
