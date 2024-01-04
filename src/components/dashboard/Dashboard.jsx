import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import Overview from "./tabs/Overview";

function Dashboard() {
  const { username } = useParams();
  const outLetProps = useOutletContext();

  const style = {
    position: 'absolute',
    height: `calc(100vh - ${outLetProps.height}px)`,
    width: `calc(100vw - ${outLetProps.width}px)`,
    top: `${outLetProps.height}px`,
    left: `${outLetProps.width}px`,
  };

  return (
    <>
      <div style={style} className="bg-primary">
        <Overview username={username} />
      </div>
    </>
  );
}

export default Dashboard;
