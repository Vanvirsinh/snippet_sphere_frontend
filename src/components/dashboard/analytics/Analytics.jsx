import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import PageNotFound from "../../pages/error404/PageNotFound";

function Analytics() {
  const [authorization, setAuthorization] = useState(false);
  const authUser = useSelector((state) => state.user.authUser);
  const { username } = useParams();

  useEffect(() => {
    const { user, isLoading } = authUser;
    if (!isLoading && user) {
      if (user.success) {
        if (user.user.username === username) {
          setAuthorization(true);
        }
      }
    }
  }, [authUser, username]);

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
      <div
        style={style}
        className="ease-in-out duration-100 bg-primary overflow-auto"
      >
        {authorization ? (
        <div className="p-3 md:p-6">
          <div>
            <div>
              <h1 className="text-xl text-white">View Your Analytics</h1>
            </div>
            <div className="mt-[200px]">
              <h1 className="md:w-4/5 mx-auto text-3xl md:text-6xl font-bold text-center text-[#303030]">
                This feature will be launched very soon!
              </h1>
            </div>
          </div>
        </div>
        ) : authUser.isLoading ? (
          <div className="text-white h-full flex justify-center items-center">
            <span><CircularProgress size={30} sx={{color: '#f2f2f2'}} /></span>
          </div>
        ) : (
          <div>
            <PageNotFound />
          </div>
        )}
      </div>
    </>
  );
}

export default Analytics;
