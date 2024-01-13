import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteSnippet } from "../../../../redux/snippet/snippetAction";
import CircularProgress from "@mui/material/CircularProgress";

function DeleteSnippet({ handleClose, open, snippetId }) {
  const dispatch = useDispatch();
  const createSnippetData = useSelector((state) => state.snippet.createSnippet);
  const [error, setError] = useState(null);

  const { isLoading, response } = createSnippetData;

  useEffect(() => {
    if (!isLoading && response) {
      if (response.success) {
        handleClose();
        window.location.reload();
      } else {
        setError(response.message || "Something Went Wrong!");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
  }, [createSnippetData, isLoading, handleClose, response]);

  const handleDelete = () => {
    dispatch(deleteSnippet(snippetId));
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
            border: "0px solid #303030",
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
        <div className="pt-5 pb-2">
          <DialogTitle id="alert-dialog-title">Delete!</DialogTitle>
          <DialogContent>
            {error && <p className="text-center text-red-400">{error}</p>}
            <div className="flex flex-col gap-y-3 text-white/[0.7] text-sm">
              <p className="text-white">
                Are you sure you want to delete this Snippet?
              </p>
              <p className="text-white/[0.7] text-sm">
                This action cannot be undone. If you proceed, the snippet and
                its contents will be permanently deleted.
              </p>
              <p className="text-white/[0.7] text-sm">
                Do you wish to proceed with the deletion?
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ background: "#232323", color: "#f2f2f2" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            {isLoading ? (
              <Button sx={{ background: "#cc3300", color: "#f2f2f2" }} disabled>
                <CircularProgress size={20} sx={{ color: "white" }} />
              </Button>
            ) : (
              <Button
                sx={{ background: "#cc3300", color: "#f2f2f2" }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

export default DeleteSnippet;
