import React, { useState } from "react";
import SnippetLogo from "../../../../assets/images/snippets-logo.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CollectionsIcon from "@mui/icons-material/Collections";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteSnippet from "./DeleteSnippet";

function SnippetItem({ snippet }) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleClickDeleteOpen = () => {
    setDeleteOpen(true);
    handleCloseUserMenu();
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const open = Boolean(anchorElUser);
  const handleOpenNavMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="bg-secondary rounded-md p-5">
      <Link
        to={`/${snippet.authorName}/snippets/${snippet.snippetId}`}
        className="flex items-center justify-center hover:scale-110 ease-in-out duration-300"
      >
        <img src={SnippetLogo} className="h-[150px]" alt="" />
      </Link>
      <div className="flex justify-between mt-5 text-white items-start">
        <div className="flex flex-col gap-y-2">
          <Link
            to={`/${snippet.authorName}/snippets/${snippet.snippetId}`}
            className="text-md hover:text-white/[0.6]"
          >
            {snippet.title}
          </Link>
          <div className="flex text-xs justify-between items-center">
            <span>
              <RemoveRedEyeIcon sx={{ fontSize: 19, mr: 1 }} /> {snippet.views}
            </span>
            <span>
              <FavoriteIcon sx={{ fontSize: 19, mr: 1 }} />{" "}
              {snippet.likes.length}
            </span>
            <span className="bg-primary p-1 rounded text-white/[0.6]">
              {snippet.language}
            </span>
          </div>
        </div>
        <div className="text-5xl flex rotate-180 relative">
          <Menu
            sx={{ mt: "0", ml: "30px" }}
            id="menu-appbar"
            open={open}
            anchorEl={anchorElUser}
            keepMounted
            PaperProps={{
              sx: {
                backgroundColor: "#1c1c1c",
                color: "#f2f2f2",
                border: "1px solid #404040",
              },
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <div className="flex gap-x-2 items-center py-1 px-2 hover:bg-secondary cursor-pointer rounded">
                <CollectionsIcon sx={{ fontSize: 20 }} />
                Change Collection
              </div>
            </MenuItem>
            <MenuItem>
              <div className="flex gap-x-2 items-center py-1 px-2 hover:bg-secondary cursor-pointer rounded">
                <EditIcon sx={{ fontSize: 20 }} />
                Edit
              </div>
            </MenuItem>
            <MenuItem onClick={handleClickDeleteOpen}>
              <div className="flex gap-x-2 items-center py-1 px-2 hover:bg-secondary cursor-pointer rounded">
                <DeleteIcon sx={{ fontSize: 20 }} /> Delete
              </div>
            </MenuItem>
          </Menu>
          <span className="cursor-pointer" onClick={handleOpenNavMenu}>
            ...
          </span>
        </div>
      </div>
      <DeleteSnippet handleClose={handleDeleteClose} open={deleteOpen} />
    </div>
  );
}

export default SnippetItem;
