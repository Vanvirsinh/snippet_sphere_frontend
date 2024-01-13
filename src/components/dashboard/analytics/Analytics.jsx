import React from "react";
import { useOutletContext } from "react-router-dom";

function Analytics() {
  const outLetProps = useOutletContext();
  const style = {
    position: "absolute",
    height: `calc(100vh - ${outLetProps.height}px)`,
    width: `calc(100vw - ${outLetProps.width}px)`,
    top: `${outLetProps.height}px`,
    left: `${outLetProps.width}px`,
  };

  return (
    <>
      <div style={style} className="ease-in-out duration-100 bg-primary overflow-auto">
        <div className="p-6">
          <div>
            <div>
              <h1 className="text-xl text-white">View Your Analytics</h1>
            </div>
            <div className="mt-[200px]">
                <h1 className="w-4/5 mx-auto text-6xl font-bold text-center text-[#303030]">This feature will be launched very soon!</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
