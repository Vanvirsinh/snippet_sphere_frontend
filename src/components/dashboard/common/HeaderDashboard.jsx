import React, { useState, useEffect, useRef } from "react";
import logo from "../../../assets/images/snippet-sphere-logo-transparent.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/auth/actions/userAction";
import LoginIcon from "@mui/icons-material/Login";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Skeleton from "@mui/material/Skeleton";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";

function HeaderSidebar({ findNavbarHeight }) {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const authUser = useSelector((state) => state.user.authUser);
  const { user, isLoading } = authUser;

  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.clientHeight;
      findNavbarHeight(height);
    }

  }, [findNavbarHeight])

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
      <div ref={headerRef}>
        <div>
          <div className="px-10 py-3 flex justify-between items-center bg-secondary">
            <div className="h-[45px]">
              <Link to="/">
                <img className="h-full" src={logo} alt="" />
              </Link>
            </div>
            <div>
              {/* Login button */}
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
                                <AccountCircleIcon
                                  sx={{ mr: 2, fontSize: 23 }}
                                />{" "}
                                <Link to={`/${user.user.username}`}>
                                  My Profile
                                </Link>
                              </MenuItem>
                              <MenuItem onClick={handleCloseUserMenu}>
                                <SnippetFolderIcon
                                  sx={{ mr: 2, fontSize: 23 }}
                                />{" "}
                                My Snippet Collections
                              </MenuItem>
                              <MenuItem onClick={handleCloseUserMenu}>
                                <TextSnippetIcon sx={{ mr: 2, fontSize: 23 }} />{" "}
                                My Snippets
                              </MenuItem>
                              <Divider sx={{ background: "#404040" }} />
                              <MenuItem onClick={handleLogout}>
                                <LogoutIcon sx={{ mr: 2, fontSize: 23 }} />{" "}
                                Logout
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
        </div>
      </div>
    </>
  );
}

export default HeaderSidebar;
