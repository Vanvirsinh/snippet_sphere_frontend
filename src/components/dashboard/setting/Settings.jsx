import React, { useEffect } from "react";
import {
  NavLink,
  useOutletContext,
  useNavigate,
  useLocation,
} from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import ResetPassword from "./ResetPassword";

function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop();

  useEffect(() => {
    if(currentTab === "settings") {
        navigate(`profile`)
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
      <div style={style} className="ease-in-out duration-100 bg-primary overflow-auto">
        <div className="p-6">
          <div className="mb-5">
            <h1 className="text-white text-xl">Settings</h1>
          </div>
          <div className="flex gap-x-10">
            <div className="flex flex-col gap-y-5">
              <div>
                <div className="flex flex-col gap-y-3 w-40">
                  <NavLink
                    to="profile"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-secondary text-light-purple"
                          : "text-white"
                      } py-2 px-4 w-full rounded hover:bg-secondary ease-in-out duration-300`
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
                      } py-2 px-4 w-full rounded hover:bg-secondary ease-in-out duration-300`
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
      </div>
    </>
  );
}

export default Settings;
