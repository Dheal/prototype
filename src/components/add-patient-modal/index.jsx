import React, { useState } from "react";

import { Box, Modal, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

import StepOne from "pages/dashboard/stepOne";
import StepTwo from "pages/dashboard/stepTwo";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #b1b1b1",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const AddPatientModal = ({
  open,
  setOpen,
  success,
  setSuccess,
  next,
  setNext,
}) => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  const handleClose = () => {
    setStep(1);
    setOpen(false);
    setNext(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal} sx={style}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          {step === 1 && (
            <StepOne
              data={data}
              setData={setData}
              setStep={setStep}
              handleClose={handleClose}
              next={next}
              setNext={setNext}
            />
          )}
          {step === 2 && (
            <StepTwo
              data={data}
              setData={setData}
              setStep={setStep}
              handleClose={handleClose}
              success={success}
              setSuccess={setSuccess}
              next={next}
              setNext={setNext}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AddPatientModal;

const useStyles = makeStyles({
  modal: {
    borderRadius: "10px",
    width: "80% !important",
    minHeight: "200px !important",
    maxHeight: "80vh !important",
    overflowY: "auto",
  },
});
