import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { updateCollection } from "../../../redux/collection/collectionAction";
import CircularProgress from "@mui/material/CircularProgress";

function UpdateCollection({ handleClose, open, collection }) {
  const dispatch = useDispatch();
  const updateCollectionData = useSelector(
    (state) => state.collection.updateCollection
  );
  const [data, setData] = useState({
    name: collection.name,
    isPublic: collection.isPublic,
  });
  const [error, setError] = useState(null);

  const { isLoading, response } = updateCollectionData;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        // handleClose();
        // setUpdated("updated");
        window.location.reload();
      } else {
        setError(response.message || "Something Went Wrong!");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
  }, [isLoading, handleClose, response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCollection({ data, collectionId: collection._id }));
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
          <DialogTitle id="alert-dialog-title">Update Collection</DialogTitle>
          {error && <p className="text-center text-red-400">{error}</p>}
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
                autoFocus
              />
              <select
                name="isPublic"
                value={data.isPublic}
                onChange={onChange}
                className="p-3 w-full rounded bg-secondary"
              >
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>
              <button className="linear-gradient-button" type="submit">
                {isLoading ? (
                  <span className="button-gradient">
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  </span>
                ) : (
                  <span className="button-gradient">Update</span>
                )}
              </button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}

export default UpdateCollection;
