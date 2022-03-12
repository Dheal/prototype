import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { Card, Typography } from "@mui/material";

import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonIcon from "@mui/icons-material/Person";

import AddPatientFormModal from "components/add-patient-form";

import "flag-icon-css/css/flag-icon.min.css";

const ProfileRecords = ({ patientDetails, handleGetPatient }) => {
  const classes = useStyles();
  const location = useLocation();
  const params = useParams();
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [next, setNext] = useState(false);
  const { t } = useTranslation();

  const handleSuccess = async () => {
    await handleGetPatient();
    setSuccess(false);
  };

  return (
    <div>
      {patientDetails && (
        <Card className={classes.card}>
          <div className={classes.centerClass}>
            <div className={classes.circle}>
              <Typography variant="h4" className={classes.heading}>
                {`${patientDetails?.demographic?.first_name?.[0] || ""}${
                  patientDetails?.demographic?.last_name?.[0] || ""
                }`}
              </Typography>
            </div>
            <Typography variant="h6" className={classes.title}>
              {`${patientDetails?.demographic?.first_name || ""} ${
                patientDetails?.demographic?.last_name || ""
              }`}
            </Typography>
            <div className={classes.flex}>
              {patientDetails?.demographic?.country?.toLowerCase() && (
                <span
                  class={`flag-icon flag-icon-${patientDetails?.demographic?.country?.toLowerCase()}`}
                ></span>
              )}
              <Typography variant="h6" className={classes.subtitle}>
                {`${patientDetails?.demographic?.age}, ${
                  genders.find(
                    (x) =>
                      x.gender_id === patientDetails?.demographic?.gender_id
                  )?.gender
                }`}
              </Typography>
            </div>
            <div className={classes.flex}>
              <ContactMailIcon style={{ color: "#A9A9A9" }} />
              <Typography variant="body1" className={classes.phone}>
                {patientDetails?.demographic?.ic_number}
              </Typography>
            </div>
            <div className={classes.flex}>
              <PhoneIphoneIcon style={{ color: "#A9A9A9" }} />
              <Typography variant="body1" className={classes.phone}>
                {patientDetails?.demographic?.mobile}
              </Typography>
            </div>
          </div>
          <div className={classes.border}></div>
          <Link
            className={classes.flex1}
            style={{ textDecoration: "none" }}
            to={`/patient/${params?.id}`}
          >
            <div className={classes.flex} style={{ marginTop: "0px" }}>
              <ScatterPlotIcon
                className={`${classes.phone} ${
                  !location.pathname.includes("result") &&
                  !location.pathname.includes("biomarker")
                    ? classes.iconActive
                    : ""
                }`}
              />
              <Typography
                variant="body1"
                className={`${classes.phone} ${
                  !location.pathname.includes("result") &&
                  !location.pathname.includes("biomarker")
                    ? classes.iconActive
                    : ""
                }`}
              >
                {t("label.result")}
              </Typography>
            </div>
            <ArrowForwardIosIcon className={classes.smallIcon} />
          </Link>
          <div className={classes.border}></div>
          <div
            className={classes.flex1}
            onClick={() => {
              setEditProfileOpen(true);
            }}
          >
            <div className={classes.flex} style={{ marginTop: "0px" }}>
              <PersonIcon className={classes.phone} />
              <Typography variant="body1" className={classes.phone}>
                {t("label.edit_profile")}
              </Typography>
            </div>
            <ArrowForwardIosIcon className={classes.smallIcon} />
          </div>
          <AddPatientFormModal
            headings={{
              heading: t("patient.edit_patient"),
              subHeading: t("patient.edit_patient_profile"),
              supporting: t("patient.edit_patient_supporting_information"),
            }}
            successHeadings={{
              heading: "Patient Profile Updated",
              subHeading: "This profile has been updated.",
            }}
            open={editProfileOpen}
            setOpen={setEditProfileOpen}
            success={success}
            setSuccess={setSuccess}
            next={next}
            setNext={setNext}
            updateId={params?.id}
            patientDetails={patientDetails}
            handleSuccess={handleSuccess}
          />
        </Card>
      )}
    </div>
  );
};

export default ProfileRecords;

const useStyles = makeStyles({
  smallIcon: {
    fontSize: "12px !important",
    color: "#8493AE !important",
    fontWeight: "500 !important",
  },
  card: {
    boxShadow: "0px 0px 6px #eeeeee !important",
    padding: "20px 0px",
  },
  centerClass: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  heading: {
    fontWeight: "bold !important",
    color: "white !important",
  },
  border: {
    borderBottom: "1px solid #d9dfeb",
    width: "100%",
    margin: "20px 0px",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  flex1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    marginTop: "0px",
    padding: "0px 25px",
    "&:hover ": {
      "& > div ": {
        " & > phone": {
          color: "#010101 !important",
        },
      },
    },
  },
  phone: {
    color: "#8493AE !important",
    fontWeight: "500 !important",
    fontFamily: "Mukta !important",
    marginLeft: "10px !important",
  },
  title: {
    color: "#273859 !important",
    fontWeight: "bold !important",
    fontFamily: "Mukta !important",
    marginTop: "20px !important",
    padding: "0px 10px !important",
    textAlign: "center !important",
  },
  subtitle: {
    color: "#273859 !important",
    fontFamily: "Mulish !important",
    marginLeft: "10px !important",
  },
  circle: {
    backgroundColor: "#888888",
    borderRadius: "50%",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80px",
  },
  iconActive: {
    color: "#06599E !important",
  },
  flag: {
    width: "25px",
    height: "20px",
  },
});

const genders = [
  { gender_id: 1, gender: "Male" },
  { gender_id: 2, gender: "Female" },
  { gender_id: 3, gender: "Others" },
];
