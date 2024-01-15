import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { NavLink, Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
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
import Skeleton from "@mui/material/Skeleton";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  background: "#1c1c1c",
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function MyDrawer({
  open,
  handleLogout,
  anchorElUser,
  handleCloseUserMenu,
  handleOpenNavMenu,
  isLoading,
  user,
  openMenu,
  handleDrawerClose,
}) {
  const theme = useTheme();

  return (
    <>
      <Drawer
        sx={{
          width: "drawerWidth",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            height: "100vh",
            background: "#1c1c1c",
            borderRight: "1px solid #303030",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openMenu}
      >
        <DrawerHeader>
          <IconButton sx={{ color: "#f2f2f2" }} onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{border: '1px solid white'}} />
            ) : (
              <ChevronLeftIcon sx={{border: '1px solid white', borderRadius: '50%'}} />
            )}
          </IconButton>
        </DrawerHeader>
        {/* <Divider sx={{ background: "#303030" }} /> */}
        <List sx={{ background: "#1c1c1c", color: "#f2f2f2" }}>
          {[
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
            { name: "Features", path: "/features" },
            { name: "Explore Snippets", path: "/explore-snippets" },
            { name: "Blog", path: "https://codemafias.com" },
            { name: "FAQs", path: "faqs" },
          ].map((items, index) => (
            <ListItem key={index} onClick={handleDrawerClose}>
              <NavLink
                to={items.path}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white font-semibold" : ""
                  } w-full text-[#EDEADE] text-opacity-[0.9]`
                }
              >
                <ListItemButton>{items.name}</ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>

        <List sx={{ background: "#1c1c1c", color: "#f2f2f2", padding: '20px', paddingTop: 0 }}>
          <div className="flex gap-x-5">
            {!isLoading ? (
              <div>
                {!user ? (
                  <div>
                    <Link to="/auth/sign-in" className="button-bg">
                      <button onClick={handleDrawerClose}>
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
                                  src={`http://localhost:8000${user.userImage}`}
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
                              <Link
                                className="w-full"
                                to={`/${user.user.username}`}
                              >
                                <AccountCircleIcon
                                  sx={{ mr: 2, fontSize: 23 }}
                                />{" "}
                                My Profile
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                              <Link
                                className="w-full"
                                to={`/${user.user.username}/collection`}
                              >
                                <SnippetFolderIcon
                                  sx={{ mr: 2, fontSize: 23 }}
                                />{" "}
                                My Snippet Collections
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                              <Link
                                className="w-full"
                                to={`/${user.user.username}/snippets`}
                              >
                                <TextSnippetIcon sx={{ mr: 2, fontSize: 23 }} />{" "}
                                My Snippets
                              </Link>
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
                          <button onClick={handleDrawerClose}>
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
        </List>
      </Drawer>
    </>
  );
}
