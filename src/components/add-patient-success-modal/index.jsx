import * as React from "react";
import { makeStyles } from "@mui/styles";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
  position: "absolute",
  top: 270,
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #b1b1b1",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const AddPatientSuccessModal = ({
  headings,
  open,
  setOpen,
  handleClose,
  body,
}) => {
  const classes = useStyles();

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
          <div className={classes.process}>
            <CheckCircleIcon
              className={classes.icon}
              color={"success"}
              fontSize={"large"}
            />
            <Typography
              className={classes.request}
              variant={"h3"}
              color={"#273859"}
            >
              {headings.heading}
            </Typography>
            <Typography className={classes.processText} color={"#273859"}>
              {headings.subHeading}
            </Typography>
            <div className={classes.btnContainer}>
              <span
                className={classes.close}
                onClick={() => {
                  handleClose();
                }}
              >
                Close
              </span>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddPatientSuccessModal;

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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  processText: {
    fontSize: "13px !important",
    textAlign: "center",
    color: "#8493ae",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "25px 0 15px 0",
    width: "100%",
  },
  close: {
    fontFamily: "Mulish",
    fontSize: "16px",
    fontWeight: 600,
    color: "#d9dfeb !important",
    paddingBottom: "5px",
    borderBottom: "2px solid #d9dfeb",
    cursor: "pointer",
  },
  request: {
    fontFamily: "Mukta !important",
    fontSize: "28px !important",
    fontWeight: "700 !important",
    color: "#273859 !important",
  },
  icon: {
    width: "80px !important",
    height: "80px !important",
    marginTop: "60px",
    marginBottom: "30px",
  },
});
