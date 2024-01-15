import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import HeaderDashboard from "./HeaderDashboard";
import Sidebar from "./Sidebar";
import PageNotFound from "../../pages/error404/PageNotFound";
import { fetchUserProfile } from "../../../redux/profile/profileAction";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

function DashboardLayout() {
  const [userExists, setUserExists] = useState(false);
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile(username));
  }, [dispatch, username]);

  const userProfile = useSelector((state) => state.profile.userProfile);

  useEffect(() => {
    const { isLoading, response } = userProfile;
    if (!isLoading && response) {
      if (response.success) {
        setUserExists(true);
      }
    }
  }, [userProfile]);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const findNavbarHeight = (height) => {
    setHeight(height);
  };

  const findSidebarWidth = (width) => {
    setWidth(width);
  };

  const outLetProps = {
    height,
    width,
  };

  return (
    <>
      {userExists ? (
        <div>
          <HeaderDashboard findNavbarHeight={findNavbarHeight} />
          <Outlet context={outLetProps} />
          <Sidebar navbarHeight={height} findSidebarWidth={findSidebarWidth} />
        </div>
      ) : userProfile.isLoading ? (
        <div className="bg-primary h-screen w-screen flex justify-center items-center">
            <span>
                <CircularProgress size={30} sx={{color: '#f2f2f2'}} />
            </span>
        </div>
      ) : (
        <div>
            <PageNotFound />
        </div>
      )}
    </>
  );
}

export default DashboardLayout;
