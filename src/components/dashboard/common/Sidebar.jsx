import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import CollectionsIcon from "@mui/icons-material/Collections";
import CodeIcon from "@mui/icons-material/Code";
import PushPinIcon from "@mui/icons-material/PushPin";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function Sidebar({ navbarHeight, findSidebarWidth }) {
  const height = {
    height: `calc(100vh - ${navbarHeight}px)`,
    top: navbarHeight,
  };

  const sideBarRef = useRef(null);

  useEffect(() => {
    if (sideBarRef.current) {
      const width = sideBarRef.current.clientWidth;
      findSidebarWidth(width);
    }
  }, [findSidebarWidth]);

  return (
    <>
      <div>
        <div>
          <div
            ref={sideBarRef}
            style={height}
            className={`bg-secondary h-[100vh] w-60 absolute left-0`}
          >
            <div className="flex flex-col justify-between h-full">
              <ul>
                <li>
                  <NavLink
                    to="/vanvirsinh"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-light-purple bg-primary" : "text-white"
                      } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                    }
                  >
                    <SpaceDashboardIcon sx={{ fontSize: 23, mr: 1 }} />
                    <span className="text-white">Overview</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/collection"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-light-purple bg-primary" : "text-white"
                      } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                    }
                  >
                    <CollectionsIcon sx={{ fontSize: 23, mr: 1 }} />
                    <span className="text-white">Collection</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/snippets"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-light-purple bg-primary" : "text-white"
                      } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                    }
                  >
                    <CodeIcon sx={{ fontSize: 23, mr: 1 }} />
                    <span className="text-white">Snippets</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/pinned-snippets"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-light-purple bg-primary" : "text-white"
                      } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                    }
                  >
                    <PushPinIcon sx={{ fontSize: 23, mr: 1 }} />
                    <span className="text-white">Pinned Snippets</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/analytics"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-light-purple bg-primary" : "text-white"
                      } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                    }
                  >
                    <AnalyticsIcon sx={{ fontSize: 23, mr: 1 }} />
                    <span className="text-white">Analytics</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-light-purple bg-primary" : "text-white"
                      } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                    }
                  >
                    <PersonIcon sx={{ fontSize: 23, mr: 1 }} />
                    <span className="text-white">Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/setting"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-light-purple bg-primary" : "text-white"
                      } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                    }
                  >
                    <SettingsIcon sx={{ fontSize: 23, mr: 1 }} />
                    <span className="text-white">Setting</span>
                  </NavLink>
                </li>
              </ul>
              <div>
                <ul>
                  <li>
                    <NavLink
                      to="/documentation"
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "text-light-purple bg-primary"
                            : "text-white"
                        } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                      }
                    >
                      <InsertDriveFileIcon sx={{ fontSize: 23, mr: 1 }} />
                      <span className="text-white">Documentation</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/collapse-sidebars"
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "text-light-purple bg-primary"
                            : "text-white"
                        } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                      }
                    >
                      <ArrowCircleLeftIcon sx={{ fontSize: 23, mr: 1 }} />
                      <span className="text-white">Collapse Sidebar</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
