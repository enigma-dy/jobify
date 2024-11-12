import React from "react";

const Hero = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src="http://127.0.0.1:5000/images/hero.png"
        alt="Hero Banner"
        className="absolute bottom-0-0 left-0 w-full h-full object-contain"
      />
    </div>
  );
};

export default Hero;
