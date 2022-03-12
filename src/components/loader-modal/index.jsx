import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #b1b1b1",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const LoaderModal = ({ open, setOpen }) => {
  const classes = useStyles();
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modal}
      >
        <Box sx={style}>
          <div className={classes.loaderContainer}>
            <div className="loader"></div>
          </div>
          <div className={classes.process}>
            <Typography
              className={classes.processText}
              color={"#273859"}
              sx={{ mt: 7 }}
            >
              processing...
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LoaderModal;

const useStyles = makeStyles({
  modal: {
    borderRadius: "10px",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "50px",
    paddingBottom: "0px",
  },
  process: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  processText: {
    fontSize: "13px !important",
  },
});
