import React from "react";
import { useOutletContext } from "react-router-dom";

function Snippets() {
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
      <div style={style} className="bg-primary overflow-auto">
        <div className="p-6">
            <h1>All Snippets</h1>
        </div>
      </div>
    </>
  );
}

export default Snippets;
