import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function CreateCollection({ handleClose, open, createCollection, setCreated }) {
  const [data, setData] = useState({ name: "", isPublic: true });

  const collectionData = useSelector((state) => state.collection.collection);

  const { isLoading, collection } = collectionData;

  useEffect(() => {
    if (!isLoading && collection) {
      window.location.reload();
    }
  }, [isLoading, collection, handleClose, setCreated]);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCollection(data);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            backgroundColor: "#1c1c1c",
            color: "#f2f2f2",
            border: "1px solid #303030",
            maxWidth: '350px',
            width: '100vw',
          },
        }}
      >
        <div>
          <div className="absolute right-3 top-3">
            <span
              className="flex justify-center items-center cursor-pointer rounded border p-[1px] border-primary active:border-white"
              onClick={handleClose}
            >
              <CloseIcon />
            </span>
          </div>
        </div>
        <div className="pt-3 md:pt-5 pb-2">
          <DialogTitle id="alert-dialog-title">
            Create New Collection
          </DialogTitle>
          <DialogContent sx={{padding: 2}}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-y-5 pt-2"
            >
              <input
                name="name"
                value={data.name}
                type="text"
                className="p-3 w-full rounded bg-secondary"
                placeholder="Enter Collection name"
                onChange={onChange}
              />
              <select
                name="isPublic"
                value={data.isPublic}
                className="p-3 w-full rounded bg-secondary"
                onChange={onChange}
              >
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>
              {isLoading ? (
                <button
                  disabled
                  className="linear-gradient-button"
                  type="submit"
                >
                  <span className="button-gradient">
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  </span>
                </button>
              ) : (
                <button className="linear-gradient-button" type="submit">
                  <span className="button-gradient">Create</span>
                </button>
              )}
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}

export default CreateCollection;
