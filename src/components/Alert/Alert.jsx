import { Alert } from "@mui/material";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";

const alertStyle = {
  position: "fixed",
  top: "0px",
  right: "0px",
  transition: "transform 0.5s ease-in-out",
  height: "100vh",
  width: "100vw",
  backgroundColor: "#00000090",
  display: "flex",
  justifyContent: "end",
  paddingRight: "40px",
  paddingTop: "100px",
  zIndex: 1000,
  overflow: 'auto'
};

function AlertBox(props) {
  return (
    <div>
      <div>
        <div
          onClick={() => props.handleClose()}
          className="bg-white text-secondary rounded-sm absolute top-10 right-10 cursor-pointer"
        >
          <CloseIcon />
        </div>
      </div>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {props.errors.map((error, index) => {
          return (
            <Alert key={index} severity="error">
              {error.msg}
            </Alert>
          );
        })}
      </Stack>
    </div>
  );
}

export { AlertBox, alertStyle };
