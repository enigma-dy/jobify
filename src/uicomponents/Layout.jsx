// Layout.jsx
import React, { useEffect, useState } from "react";
import DesktopNavComponent from "./DesktopNavComponent";
import MobileNavComponent from "./MobileNavComponent";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="absolute top-0 w-full overflow-hidden z-50">
        {isMobile ? <MobileNavComponent /> : <DesktopNavComponent />}
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
