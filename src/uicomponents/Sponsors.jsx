import React from "react";
import LogoSwipper from "./Logoswiper";

export default function Sponsors() {
  return (
    <div className="p-3">
      <LogoSwipper>
        {(isReady) => (
          isReady && (
            <>
              <h2 className="text-xl font-bold text-gray-400">
                Companies we've helped grow
              </h2>
              <LogoSwipper />
            </>
          )
        )}
      </LogoSwipper>
    </div>
  );
}
