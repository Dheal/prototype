import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Tabs from "components/tabs";
import AddPatientFormModal from "components/add-patient-form";
import { theme } from "config/theme";

const TabsAddPatients = ({
  setPage,
  setOpen,
  open,
  success,
  setSuccess,
  next,
  setNext,
  tabsCount,
  searchData,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleSuccess = async () => {
    setSuccess(false);
  };

  return (
    <>
      <Grid container spacing={2} className={classes.container}>
        
      </Grid>
      <div className={classes.addPatient}>
        <AddPatientFormModal
          headings={{
            heading: t("patient.add_patient"),
            subHeading: t("patient.add_new_profile_into_the_system"),
            supporting: t("patient.add_patient_supporting_information"),
            supportingSubHeading: t(
              "patient.enter_the_patients_supporting_information"
            ),
          }}
          successHeadings={{
            heading: "Patient Profile Created",
            subHeading: "This profile has been added.",
          }}
          open={open}
          setOpen={setOpen}
          success={success}
          setSuccess={setSuccess}
          next={next}
          setNext={setNext}
          updateId={""}
          handleSuccess={handleSuccess}
        />
      </div>
    </>
  );
};

export default TabsAddPatients;

const useStyles = makeStyles({
  addBtn: {
    [theme.breakpoints.down("sm")]: {
      order: 1,
    },
  },
  tabsAdd: {
    [theme.breakpoints.down("sm")]: {
      order: 2,
    },
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-end",
      marginRight: "10px",
    },
  },
  btn: {
    height: "40px !important",
    borderRadius: " 44px !important",
    backgroundColor: "#06599E !important",
    textDecoration: " none",
    textTransform: "initial !important",
    textOutline: " none",
    boxShadow: "none !important",
    color: " #fff",
    width: " 150px",
    fontSize: "16px !important",
  },
  container: {
    margin: "0px !important",
    marginBottom: "20px !important",
  },
});

const tabs = [
  {
    value: "/dashboard/for-review/",
    label: "For Reviews",
    key: "review",
  },
  {
    value: "/dashboard/all-patient/",
    label: "All Patients",
    key: "patient",
  },
];
