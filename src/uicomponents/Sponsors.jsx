import React from "react";
import LogoSwipper from "./Logoswiper";

export default function Sponsors() {
  return (
    <div className="p-3">
      <h2 className="text-xl font-bold text-gray-400">
        companies we've helped grow
      </h2>
      <LogoSwipper />
    </div>
  );
}
