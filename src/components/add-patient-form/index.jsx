import React, { useEffect, useState } from "react";

import { Box, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";

import StepOne from "components/add-patient-form/stepOne";
import StepTwo from "components/add-patient-form/stepTwo";
import AddPatientSuccessModal from "components/add-patient-success-modal";
import { apiRequest } from "services";

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

const AddPatientFormModal = ({
  headings,
  successHeadings,
  open,
  setOpen,
  success,
  setSuccess,
  next,
  setNext,
  updateId,
  patientDetails,
  handleSuccess,
}) => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const [countries, setCountries] = useState({});

  const handleClose = () => {
    setStep(1);
    setOpen(false);
    setNext(false);
  };

  const getCountries = async () => {
    const res = await apiRequest({
      type: "get",
      path: `/admin/clinics/get_countries`,
    });
    if (res?.status === 200) {
      setCountries(res.data.countries);
    }
  };

  useEffect(() => {
    let contact = [];
    let mobile = [];

    getCountries();
    if (patientDetails?.demographic?.contact !== null) {
      contact = patientDetails?.demographic?.contact.split(" ");
    }
    if (patientDetails?.demographic?.mobile !== null) {
      mobile = patientDetails?.demographic?.mobile.split(" ");
    }

    setData({
      first_name: patientDetails?.demographic?.first_name || "",
      last_name: patientDetails?.demographic?.last_name || "",
      gender:
        genders.find(
          (x) => x.gender_id === patientDetails?.demographic?.gender_id
        )?.gender || "",
      country: patientDetails?.demographic?.country_name || "",
      ic_type: patientDetails?.demographic?.ic_type || "",
      ic_number: patientDetails?.demographic?.ic_number || "",
      ethnic: patientDetails?.demographic?.ethnic || "",
      birth_date:
        patientDetails?.demographic?.birth_date !== null
          ? patientDetails?.demographic?.birth_date
          : "",
      address: patientDetails?.demographic?.address || "",
      postal_code: patientDetails?.demographic?.postal_code || "",
      contactNumber: contact?.[1] || "",
      contactNumber_code: contact?.[0] || "",
      mobileNumber: mobile?.[1] || "",
      mobileNumber_code: mobile?.[0] || "",
      email_address: patientDetails?.demographic?.email_address || "",
      marital_status: patientDetails?.demographic?.marital_status || "",
      occupation: patientDetails?.demographic?.occupation || "",
      language: patientDetails?.demographic?.language || "",
      religion: patientDetails?.demographic?.religion || "",
      nok: patientDetails?.demographic?.nok || "",
      nok_relationship: patientDetails?.demographic?.nok_relationship || "",
      payor: patientDetails?.demographic?.payor || "",
      insurer: patientDetails?.demographic?.insurer || "",
      payor_name: patientDetails?.demographic?.payor_name || "",
      policy_no: patientDetails?.demographic?.policy_no || "",
      policy_expiry_date: patientDetails?.demographic?.policy_expiry_date || "",
    });
    // eslint-disable-next-line
  }, [patientDetails]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal} sx={style}>
          {step === 1 && (
            <StepOne
              headings={headings}
              data={data}
              setData={setData}
              setStep={setStep}
              countries={countries}
              handleClose={handleClose}
              next={next}
              setNext={setNext}
              updateId={updateId}
            />
          )}
          {step === 2 && (
            <StepTwo
              headings={headings}
              data={data}
              setData={setData}
              countries={countries}
              setStep={setStep}
              handleClose={handleClose}
              success={success}
              setSuccess={setSuccess}
              next={next}
              setNext={setNext}
              updateId={updateId}
            />
          )}
        </Box>
      </Modal>
      <AddPatientSuccessModal
        headings={successHeadings}
        open={success}
        setOpen={setSuccess}
        handleClose={handleSuccess}
      />
    </div>
  );
};

export default AddPatientFormModal;

const useStyles = makeStyles({
  modal: {
    borderRadius: "10px",
    width: "65% !important",
    minHeight: "200px !important",
    maxHeight: "80vh !important",
    overflowY: "auto",
    padding: "15px !important",
  },
});

const genders = [
  { gender_id: 1, gender: "Male" },
  { gender_id: 2, gender: "Female" },
  { gender_id: 3, gender: "Others" },
];
