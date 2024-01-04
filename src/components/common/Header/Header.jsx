import React, { useState, useEffect } from "react";
import Logo from "../../../assets/images/snippet-sphere-logo-transparent.png";
import "./header.css";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../redux/auth/actions/userAction";
import Cookies from "js-cookie";
import Skeleton from "@mui/material/Skeleton";

function Header() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.authUser);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, isLoading } = authUser;

  useEffect(() => {
    const token = Cookies.get("user-token");
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch]);

  const open = Boolean(anchorElUser);
  const handleOpenNavMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
  };

  return (
    <>
      <nav className="sticky top-0 bg-primary border-b border-[#303030] z-[999]">
        <div className="">
          <div className="px-10 py-3 flex justify-between items-center">
            <div className="flex items-center gap-10">
              <Link to="/" className="h-[45px]">
                <img className="h-full" src={Logo} alt="" />
              </Link>
              <div>
                <ul className="flex text-[#EDEADE] text-opacity-[0.9] gap-5">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `${isActive ? "text-white font-semibold" : ""}`
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `${isActive ? "text-white font-semibold" : ""}`
                      }
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/features"
                      className={({ isActive }) =>
                        `${isActive ? "text-white font-semibold" : ""}`
                      }
                    >
                      Features
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="https://codemafias.com/" target="_blank">
                      Blog
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/documentation"
                      className={({ isActive }) =>
                        `${isActive ? "text-white font-semibold" : ""}`
                      }
                    >
                      Documentation
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        `${isActive ? "text-white font-semibold" : ""}`
                      }
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* Login and Sign Up buttons */}
            {!isLoading ? (
              <div>
                {!user ? (
                  <div>
                    <Link to="/auth/sign-in" className="button-bg">
                      <button>
                        Sign In <LoginIcon className="ml-3" />
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div>
                    {user.success ? (
                      <div>
                        <div>
                          <div
                            className="flex justify-center items-center text-white gap-3 cursor-pointer"
                            onClick={handleOpenNavMenu}
                          >
                            <span className="user-profile">
                              {user.userImage === "" ? (
                                <div className="h-full w-full rounded-full custom-avatar flex justify-center items-center">
                                  <h1 className="text-center text-xl font-semibold">
                                    {user.user.name.charAt(0)}
                                  </h1>
                                </div>
                              ) : (
                                <img
                                  src={user.userImage}
                                  alt={user.user.name}
                                  className="h-full w-full rounded-full"
                                />
                              )}
                            </span>
                            <ExpandMoreIcon />
                          </div>
                          <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            open={open}
                            anchorEl={anchorElUser}
                            keepMounted
                            PaperProps={{
                              sx: {
                                backgroundColor: "#232323",
                                color: "#f2f2f2",
                                border: "1px solid #404040",
                              },
                            }}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            onClose={handleCloseUserMenu}
                          >
                            <MenuItem>
                              <Typography>{user.user.name}</Typography>
                            </MenuItem>
                            <Divider sx={{ background: "#404040" }} />
                            <MenuItem onClick={handleCloseUserMenu}>
                              <AccountCircleIcon sx={{ mr: 2, fontSize: 23 }} />{" "}
                              <Link to={`/${user.user.username}`}>My Profile</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                              <SnippetFolderIcon sx={{ mr: 2, fontSize: 23 }} />{" "}
                              My Snippet Collections
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                              <TextSnippetIcon sx={{ mr: 2, fontSize: 23 }} />{" "}
                              My Snippets
                            </MenuItem>
                            <Divider sx={{ background: "#404040" }} />
                            <MenuItem onClick={handleLogout}>
                              <LogoutIcon sx={{ mr: 2, fontSize: 23 }} /> Logout
                            </MenuItem>
                          </Menu>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Link to="/auth/sign-in" className="button-bg">
                          <button>
                            Sign In <LoginIcon className="ml-3" />
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Skeleton
                variant="rectangular"
                sx={{ background: "#303030", borderRadius: 1 }}
                width={100}
                height={40}
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
