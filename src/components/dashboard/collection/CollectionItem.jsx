import React, { useState } from "react";
import CollectionLogo from "../../../assets/images/collections-logo.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteCollection from "./DeleteCollection";
import UpdateCollection from "./UpdateCollection";
import { useSelector } from "react-redux";

function CollectionItem({ collection }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const authUser = useSelector((state) => state.user.authUser);
  const { user } = authUser;
  const {username} = useParams();

  const handleClickDeleteOpen = () => {
    setDeleteOpen(true);
    handleCloseUserMenu();
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleClickUpdateOpen = () => {
    setUpdateOpen(true);
    handleCloseUserMenu();
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
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
    <div className="relative bg-secondary rounded-md p-5">
      <div className="flex items-center justify-center">
        <img src={CollectionLogo} className="h-[120px] sm:h-[150px]" alt="" />
      </div>
      <div className="flex justify-between mt-5 text-white items-start">
        <div>
          <h1 className="mb-3 sm:mb-5">{collection.name}</h1>
          <div>
            <div className="linear-gradient-button">
              <Link
                to={`${collection.collectionId}`}
                className="button-dark text-sm"
                style={{padding: '5px 10px'}}
              >
                View <ArrowRightAltIcon />
              </Link>
            </div>
            <span className="absolute right-5 bottom-5 text-white/[0.6] text-sm ml-3 bg-primary px-2 py-1 rounded-md">
              {collection.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
        </div>
        {user && user.user.username === username && (
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
            <MenuItem onClick={handleClickUpdateOpen}>
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
        )}
      </div>
      <DeleteCollection collection={collection} handleClose={handleDeleteClose} open={deleteOpen} />
      <UpdateCollection collection={collection} handleClose={handleUpdateClose} open={updateOpen} />
    </div>
  );
}

export default CollectionItem;
