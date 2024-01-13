import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import CollectionsIcon from "@mui/icons-material/Collections";
import CodeIcon from "@mui/icons-material/Code";
import PushPinIcon from "@mui/icons-material/PushPin";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Tooltip from "@mui/material/Tooltip";

function Sidebar({ navbarHeight, findSidebarWidth }) {
  const height = {
    height: `calc(100vh - ${navbarHeight}px)`,
    top: navbarHeight,
  };

  const [collapse, setCollapse] = useState(true);
  const sideBarRef = useRef(null);
  const { username } = useParams();

  useEffect(() => {
    if (sideBarRef.current) {
      const width = sideBarRef.current.clientWidth;
      findSidebarWidth(width);
    }
  }, [findSidebarWidth, collapse]);

  const handleCollapse = () => {
    setCollapse((c) => !c);
  };

  return (
    <>
      <div>
        <div>
          <div
            ref={sideBarRef}
            style={height}
            className={`bg-secondary h-[100vh] ${
              collapse ? "w-60" : "w-[70px]"
            } absolute left-0`}
          >
            <div className="flex flex-col justify-between h-full">
              <ul>
                <Tooltip title={`${username}`}>
                  <li>
                    <NavLink
                      to={`/${username}`}
                      end
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "text-light-purple bg-primary"
                            : "text-white"
                        } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                      }
                    >
                      <SpaceDashboardIcon sx={{ fontSize: 23, mr: 1 }} />
                      {collapse && <span className="text-white">Overview</span>}
                    </NavLink>
                  </li>
                </Tooltip>
                <Tooltip title={`${username}`}>
                <li>
                  <NavLink
                    to={`/${username}/collection`}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-light-purple bg-primary" : "text-white"
                      } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                    }
                  >
                    <CollectionsIcon sx={{ fontSize: 23, mr: 1 }} />
                    {collapse && <span className="text-white">Collection</span>}
                  </NavLink>
                </li>
                </Tooltip>
                <Tooltip title={`${username}`}>
                <li>
                  <NavLink
                    to={`/${username}/snippets`}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-light-purple bg-primary" : "text-white"
                      } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                    }
                  >
                    <CodeIcon sx={{ fontSize: 23, mr: 1 }} />
                    {collapse && <span className="text-white">Snippets</span>}
                  </NavLink>
                </li>
                  </Tooltip>
                <Tooltip title={`${username}`}>
                <li>
                  <NavLink
                    to={`/${username}/pinned-snippets`}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-light-purple bg-primary" : "text-white"
                      } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                    }
                  >
                    <PushPinIcon sx={{ fontSize: 23, mr: 1 }} />
                    {collapse && (
                      <span className="text-white">Pinned Snippets</span>
                    )}
                  </NavLink>
                </li>
                  </Tooltip>
                <Tooltip title={`${username}`}>
                <li>
                  <NavLink
                    to={`/${username}/analytics`}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-light-purple bg-primary" : "text-white"
                      } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                    }
                  >
                    <AnalyticsIcon sx={{ fontSize: 23, mr: 1 }} />
                    {collapse && <span className="text-white">Analytics</span>}
                  </NavLink>
                </li>
                  </Tooltip>
                <Tooltip title={`${username}`}>
                <li>
                  <NavLink
                    to={`/${username}/profile`}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-light-purple bg-primary" : "text-white"
                      } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                    }
                  >
                    <PersonIcon sx={{ fontSize: 23, mr: 1 }} />
                    {collapse && <span className="text-white">Profile</span>}
                  </NavLink>
                </li>
                  </Tooltip>
                <Tooltip title={`${username}`}>
                <li>
                  <NavLink
                    to={`/${username}/settings`}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-light-purple bg-primary" : "text-white"
                      } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                    }
                  >
                    <SettingsIcon sx={{ fontSize: 23, mr: 1 }} />
                    {collapse && <span className="text-white">Settings</span>}
                  </NavLink>
                </li>
                  </Tooltip>
              </ul>
              <div>
                <ul>
                  <li>
                    <NavLink
                      to="/explore-snippets"
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "text-light-purple bg-primary"
                            : "text-white"
                        } pl-6 text-sm inline-block py-4 w-full hover:bg-primary`
                      }
                    >
                      <SnippetFolderIcon sx={{ fontSize: 23, mr: 1 }} />
                      {collapse && (
                        <span className="text-white">Explore Snippets</span>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleCollapse}
                      className="flex pl-6 text-sm text-white inline-block py-4 w-full hover:bg-primary"
                    >
                      {collapse ? (
                        <ArrowCircleLeftIcon sx={{ fontSize: 23, mr: 1 }} />
                      ) : (
                        <ArrowCircleRightIcon sx={{ fontSize: 23, mr: 1 }} />
                      )}
                      {collapse && (
                        <span className="text-white">Collapse Sidebar</span>
                      )}
                    </button>
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
