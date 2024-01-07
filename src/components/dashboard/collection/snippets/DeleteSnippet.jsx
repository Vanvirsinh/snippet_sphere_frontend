import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import Button from '@mui/material/Button';

function DeleteSnippet({ handleClose, open }) {
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
            <Button sx={{background: '#232323', color: '#f2f2f2'}} onClick={handleClose}>Cancel</Button>
            <Button sx={{background: '#cc3300', color: '#f2f2f2'}} onClick={handleClose} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

export default DeleteSnippet;