import React, { useEffect, useState } from "react";

import { Container, Grid } from "@mui/material";

import ProfileRecords from "./records-profile";
import LatestTabs from "./tabs";
import { useLocation } from "react-router-dom";

import { useParams } from "react-router-dom";
import Chart from "./chart";
import { getPatientsDetailsLatest } from "./helper";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useSwitch } from "@mui/base/SwitchUnstyled";
import clsx from "clsx";
import Pagination from "@mui/material/Pagination";

const Profile = ({ patientDetails, handleGetPatient }) => {
  const location = useLocation();
  const params = useParams();
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [next, setNext] = useState(false);
  const { t } = useTranslation();

  const genders = [
    { gender_id: 1, gender: "Male" },
    { gender_id: 2, gender: "Female" },
    { gender_id: 3, gender: "Others" },
  ];
  const handleSuccess = async () => {
    await handleGetPatient();
    setSuccess(false);
  };
  const blue = {
    500: "#007FFF",
  };

  const grey = {
    400: "#BFC7CF",
    500: "#AAB4BE",
    600: "#6F7E8C",
  };

  const BasicSwitchRoot = styled("span")(
    ({ theme }) => `
    font-size: 0;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    margin: 10px;
    background: ${theme.palette.mode === "dark" ? grey[600] : grey[400]};
    border-radius: 10px;
    cursor: pointer;
  
    &.Switch-disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  
    &.Switch-checked {
      background: ${blue[500]};
    }
    `
  );

  const BasicSwitchInput = styled("input")`
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  `;

  const BasicSwitchThumb = styled("span")`
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;

    &.Switch-focusVisible {
      background-color: ${grey[500]};
      box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
    }

    &.Switch-checked {
      left: 22px;
      top: 3px;
      background-color: #fff;
    }
  `;

  function BasicSwitch(props) {
    const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

    const stateClasses = {
      "Switch-checked": checked,
      "Switch-disabled": disabled,
      "Switch-focusVisible": focusVisible,
    };

    return (
      <BasicSwitchRoot className={clsx(stateClasses)}>
        <BasicSwitchThumb className={clsx(stateClasses)} />
        <BasicSwitchInput {...getInputProps()} aria-label="Demo switch" />
      </BasicSwitchRoot>
    );
  }

  console.log(patientDetails?.demographic);
  return (
    <>
      <React.Fragment>
        <CardContent>
          {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
          <Typography
            variant="h5"
            component="div"
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: "grey",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <img
              src="https://i.ibb.co/qygb8My/klipartz-com.png"
              style={{ width: 20 }}
            />
          </Typography>
          <Box
            sx={{
              mx: "auto",
              width: 100,
              //   backgroundColor: "black",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",

                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  mx: "auto",
                  width: 100,
                  height: 100,
                  //   backgroundColor: "black",
                }}
              >
                <img
                  src="https://www.sunsetlearning.com/wp-content/uploads/2019/09/User-Icon-Grey-300x300.png"
                  style={{ width: 100, borderRadius: "50%" }}
                />
              </Box>
            </Typography>
          </Box>
          <Box
            sx={{
              mx: "auto",
              width: "100%",
              height: "100%",
              textAlign: "center",
              marginTop: 0,
              fontSize: "2rem",
            }}
          >
            <div>
              <b>
                {" "}
                {`${patientDetails?.demographic?.first_name || ""} ${
                  patientDetails?.demographic?.last_name || ""
                }`}
              </b>
            </div>
            <div style={{ fontSize: "0.75rem", marginTop: 20, marginLeft: 0 }}>
              <Grid container spacing={2}>
                <Grid item xm={9}>
                  {patientDetails?.demographic?.birth_date}{" "}
                  {`${patientDetails?.demographic?.age}, ${
                    genders.find(
                      (x) =>
                        x.gender_id === patientDetails?.demographic?.gender_id
                    )?.gender
                  }`}{" "}
                  {patientDetails?.demographic?.ethnic}
                </Grid>
                <Grid item xm={3}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/2560px-Flag_of_Singapore.svg.png"
                    style={{ width: 25 }}
                  />
                </Grid>
              </Grid>
            </div>
            <div style={{ fontSize: "1rem", marginTop: 20, marginLeft: "30%" }}>
              <Grid container spacing={2}>
                <Grid item xm={3}>
                  <Typography
                    variant="h7"
                    component="div"
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",

                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        mx: "auto",
                        width: 20,
                        height: 20,
                        //   backgroundColor: "black",
                      }}
                    >
                      <img
                        src="https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png"
                        style={{ width: 40, borderRadius: "50%" }}
                      />
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xm={9}>
                  {patientDetails?.demographic?.contact_info.user_id}
                </Grid>
              </Grid>
            </div>
            <div style={{ fontSize: "1rem", marginTop: 10, marginLeft: "25%" }}>
              <Grid container spacing={2}>
                <Grid item xm={3}>
                  <Typography
                    variant="h7"
                    component="div"
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",

                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        mx: "auto",
                        width: 10,
                        height: 10,
                        //   backgroundColor: "black",
                      }}
                    >
                      <img
                        src="data:image/jpeg;base64,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"
                        style={{ width: 20, borderRadius: "50%" }}
                      />
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xm={9}>
                  {patientDetails?.demographic?.mobile}
                </Grid>
              </Grid>
            </div>
            <div style={{ fontSize: "1rem", marginTop: 10, marginLeft: "25%" }}>
              <Grid container spacing={2}>
                <Grid item xm={3}>
                  <Typography
                    variant="h7"
                    component="div"
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",

                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        mx: "auto",
                        width: 10,
                        height: 10,
                        //   backgroundColor: "black",
                      }}
                    >
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLp4OJ8JF6c23lkL4e_Ziud1YsdZqTC9aFVw&usqp=CAU"
                        style={{ width: 20, borderRadius: "50%" }}
                      />
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xm={9}>
                  {patientDetails?.demographic?.email_address}
                </Grid>
              </Grid>
            </div>
            <Button
              variant="outlined"
              style={{
                borderColor: "grey",
                borderRadius: 5,
                height: 30,
                width: "60%",
                color: "black",
                marginTop: 10,
              }}
            >
              <h5>
                <b>Edit Profile</b>
              </h5>
            </Button>
            <div style={{ fontSize: 16, marginTop: 15, marginLeft: 50 }}>
              <Grid container spacing={2}>
                <Grid item xm={9} style={{ color: "grey" }}>
                  Profile Active
                </Grid>
                <Grid item xm={3} style={{ paddingTop: 7, paddingLeft: 0 }}>
                  <BasicSwitch />
                </Grid>
              </Grid>
            </div>
          </Box>
        </CardContent>
      </React.Fragment>
    </>
  );
};

export default Profile;
