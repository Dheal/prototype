import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import { Button, Card, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "config/theme";

import InputField from "components/input-field";
import { apiRequest } from "services";

import green from "assets/green.svg";
import white from "assets/default.svg";
import profile from "assets/Ellipse 34.svg";
import flag from "assets/SG.svg";
import message from "assets/Vector.svg";
import shield from "assets/Tick shield.svg";
import { getPatientsDetails } from "pages/latest-records/helper";

import "flag-icon-css/css/flag-icon.min.css";

const PatientSelection = () => {
  const classes = useStyles();
  const [searchData, setSearchData] = useState({});
  const [patientDetails, setPatientDetails] = useState({});

  const { register, watch } = useForm();
  watch(async (data) => {
    const res = await apiRequest({
      type: "post",
      path: "/v2/doctor/eorder/search_patient",
      body: {
        keywords: data?.firstName || "",
      },
    });
    if (res?.status === 200) {
      setSearchData(res?.data);
    }
  });
  useEffect(() => {
    getPatientsDetails({ id: 6686 }, setPatientDetails);
  }, []);

  return (
    <>
      <Card className={classes.card}>
        <div className={classes.flex}>
          <Typography variant="h6" className={classes.typo}>
            1. Search Patient
          </Typography>
          <img src={green} alt="" style={{ marginLeft: "10px" }} />
        </div>
        <div className={classes.flex1}>
          <div className={classes.inputField}>
            <InputField
              label={"Search Patient Name "}
              type={"text"}
              register={register}
              placeholder="Connie Smith"
              fieldName={"firstName"}
            />
            <SearchIcon className={classes.icon} />
          </div>

          <Button variant="contained" className={classes.btn}>
            Add Patient
          </Button>
        </div>
        <div className={classes.flex} style={{ marginTop: "15px" }}>
          <Typography variant="h6" className={classes.typo}>
            2. Verify Patient Information
          </Typography>
          <img src={white} alt="" style={{ marginLeft: "10px" }} />
        </div>
        <Typography variant="h6" className={classes.title}>
          Verify the patient using the existing information, update and edit
          profiles if there are any issues.
        </Typography>
        <div className={classes.borderCard}>
          <Typography variant="h6" className={classes.title1}>
            Patient Details
          </Typography>
          <div className={classes.flex2}>
            <img src={profile} alt="" />
            <div className={classes.margin}>
              <div className={classes.flex}>
                <Typography variant="h6" className={classes.typo}>
                  {`${patientDetails?.demographic?.first_name} ${
                    patientDetails?.demographic?.last_name || ""
                  }`}
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.title}
                  style={{ marginLeft: "20px", fontWeight: "normal" }}
                >
                  {`${
                    genders?.find(
                      (x) =>
                        x?.gender_id === patientDetails?.demographic?.gender_id
                    )?.gender || "N/A"
                  }, ${patientDetails?.demographic?.age}`}
                </Typography>
              </div>
              <div className={classes.flex} style={{ marginTop: "6px" }}>
                {patientDetails?.demographic?.country?.toLowerCase() && (
                  <span
                    class={`flag-icon flag-icon-${patientDetails?.demographic?.country?.toLowerCase()}`}
                  ></span>
                )}
                {patientDetails?.demographic?.ic_number && (
                  <>
                    <img
                      src={message}
                      alt=""
                      style={{
                        marginLeft: "10px",
                        height: "17px",
                        width: "17px",
                      }}
                    />
                    <Typography
                      variant="body1"
                      className={classes.title}
                      style={{ marginLeft: "10px" }}
                    >
                      {patientDetails?.demographic?.ic_number}
                    </Typography>
                  </>
                )}
              </div>
              <div className={classes.flex} style={{ marginTop: "6px" }}>
                {patientDetails?.demographic?.birth_date && (
                  <Typography variant="body1" className={classes.title}>
                    DOB: {patientDetails?.demographic?.birth_date}
                  </Typography>
                )}
                {patientDetails?.demographic?.ethnic && (
                  <Typography variant="body1" className={classes.title3}>
                    Ethnicity: {patientDetails?.demographic?.ethnic}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.flexLast}>
          <Button variant="outlined" className={classes.edit} type="submit">
            Edit Profile
          </Button>
          <div className={classes.borderCard}>
            <div className={classes.flex3}>
              <img src={shield} alt="" />
              <Typography variant="body1" className={classes.titleCorrect}>
                By clicking “Correct”, you agree that all the data provided are
                correct.
              </Typography>
              <Button
                variant="contained"
                className={classes.search}
                type="submit"
                style={{ marginLeft: "20px" }}
              >
                Correct
              </Button>
            </div>
          </div>
          <Button variant="contained" style={{ marginTop: "10px" }} disabled>
            Continue
          </Button>
        </div>
      </Card>
    </>
  );
};

export default PatientSelection;

const useStyles = makeStyles({
  margin: {
    marginLeft: "40px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "0px",
    },
  },
  edit: {
    height: "40px !important",
    borderRadius: "4px !important",
    backgroundColor: "transparent !important",
    fontFamily: "Poppins !important",
    fontSize: "14px !important",
    textTransform: "none !important",
    fontWeight: "600 !important",
    marginTop: "15px !important",
    color: "#06599E !important",
    border: "1px solid #06599E !important",
    boxShadow: "none !important",
  },
  search: {
    height: "40px !important",
    borderRadius: "4px !important",
    backgroundColor: "#06599E !important",
    fontFamily: "Poppins !important",
    fontSize: "14px !important",
    textTransform: "none !important",
    fontWeight: "600 !important",
    boxShadow: "none !important",
    [theme.breakpoints.down("md")]: {
      marginTop: "10px !important",
    },
  },
  borderCard: {
    border: "1px solid #CAD3E6",
    borderRadius: "4px",
    marginTop: "15px",
    padding: "15px 20px",
    [theme.breakpoints.down("sm")]: {
      padding: "15px 10px",
    },
  },
  inputField: {
    marginTop: "15px",
    position: "relative",
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  btn: {
    height: "44px !important",
    borderRadius: " 44px !important",
    backgroundColor: "#06599E !important",
    textDecoration: " none",
    textTransform: "initial !important",
    textOutline: " none",
    boxShadow: "none !important",
    color: " #fff",
    width: " 150px",
    fontSize: "16px !important",
    marginLeft: "90px !important",
    [theme.breakpoints.down("md")]: {
      marginTop: "10px !important",
    },
  },
  card: {
    boxShadow: "0px 0px 6px #eeeeee !important",
    marginTop: "20px !important",
    padding: "32px 20px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 10px",
    },
  },
  typo: {
    fontWeight: "bold !important",
    fontSize: "20px !important",
    color: "#2A3752 !important",
    fontFamily: "Mukta !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px !important",
    },
  },
  title: {
    fontSize: "15px !important",
    color: "#2A3752 !important",
    fontFamily: "Mulish !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px !important",
    },
  },
  titleCorrect: {
    fontSize: "15px !important",
    color: "#2A3752 !important",
    marginLeft: "10px !important",
    fontFamily: "Mulish !important",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px !important",
      marginLeft: "0px !important",
      marginTop: "8px !important",
    },
  },
  title3: {
    fontSize: "15px !important",
    color: "#2A3752 !important",
    fontFamily: "Mulish !important",
    marginLeft: "40px !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px !important",
      marginLeft: "15px !important",
    },
  },
  title1: {
    color: "#8493AE",
    fontWeight: "bold !important",
    fontSize: "16px !important",
    fontFamily: "Mukta !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px !important",
    },
  },
  icon: {
    position: "absolute",
    right: "5px",
    top: "33px",
    cursor: "pointer",
    color: "#DADADA",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  flex2: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  flex3: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down(1000)]: {
      flexDirection: "column",
    },
  },
  flexLast: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  flex1: {
    display: "flex",
    alignItems: "flex-end",
    borderBottom: "1px solid #D9DFEB",
    paddingBottom: "20px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
});

const genders = [
  { gender_id: 1, gender: "Male" },
  { gender_id: 2, gender: "Female" },
  { gender_id: 3, gender: "Others" },
];
