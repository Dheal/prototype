import * as React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 250,
  bgcolor: "background.paper",
  border: "2px solid #b1b1b1",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const SuccessModal = ({ open, setOpen, body }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/login");
    setOpen(false);
  };

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
            <Typography className={classes.request} color={"#273859"}>
              Request Sent!
            </Typography>
            <Typography className={classes.processText} color={"#273859"}>
              The BioMark representative will be in contact with you shortly to
              verify your account.
            </Typography>
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                className={classes.btn}
                type="submit"
                onClick={() => {
                  handleClose();
                }}
              >
                Back
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SuccessModal;

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
  btn: {
    height: "48px !important",
    borderRadius: " 44px !important",
    backgroundImage: "linear-gradient(342deg,#4d96d3,#06599E)",
    textTransform: "initial !important",
    textDecoration: " none",
    textOutline: " none",
    color: " #fff",
    width: " 155px",
    fontSize: "16px !important",
    "&:disabled": {
      color: "#fff !important",
      backgroundImage: "linear-gradient(342deg,#4d96d3,#06599E)",
      boxShadow: "0 10px 40px 0 #001fff61 !important",
      backgroundColor: "#dc354565 !important",
      borderColor: "#dc3545 !important",
      opacity: "0.65",
    },
  },
  request: {
    fontFamily: "Mukta !important",
    fontWeight: "600 !important",
    fontSize: "24px !important",
    color: "#212529 !important",
  },
  icon: {
    width: "70px !important",
    height: "70px !important",
    marginBottom: "30px",
  },
});
