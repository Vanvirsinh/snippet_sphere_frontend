import React, { useEffect, useState } from "react";
import {
  NavLink,
  useOutletContext,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import ResetPassword from "./ResetPassword";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import PageNotFound from "../../pages/error404/PageNotFound";

function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop();
  const authUser = useSelector((state) => state.user.authUser);
  const [authorization, setAuthorization] = useState(false);
  const { user, isLoading } = authUser;
  const { username } = useParams();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.success) {
        if (user.user.username === username) {
          setAuthorization(true);
        }
      }
    }
  }, [authUser, isLoading, user, username, navigate]);

  useEffect(() => {
    if (currentTab === "settings") {
      navigate(`profile`);
    }
  }, [navigate, currentTab]);

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
            <div className="mb-5">
              <h1 className="text-white text-xl">Settings</h1>
            </div>
            <div className="flex flex-col gap-y-5 sm:flex-row gap-x-10">
              <div className="flex flex-col gap-y-5">
                <div>
                  <div className="flex sm:flex-col gap-y-3 sm:w-40">
                    <NavLink
                      to="profile"
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-secondary text-light-purple"
                            : "text-white"
                        } py-2 px-2 sm:px-4 text-sm sm:text-base w-full rounded hover:bg-secondary ease-in-out duration-300`
                      }
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="reset-password"
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-secondary text-light-purple"
                            : "text-white"
                        } py-2 px-2 sm:px-4 text-sm sm:text-base w-full rounded hover:bg-secondary ease-in-out duration-300`
                      }
                    >
                      Reset Password
                    </NavLink>
                  </div>
                </div>
              </div>
              <div>
                {currentTab === "profile" && <UpdateProfile />}
                {currentTab === "reset-password" && <ResetPassword />}
              </div>
            </div>
          </div>
        ) : isLoading ? (
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

export default Settings;
