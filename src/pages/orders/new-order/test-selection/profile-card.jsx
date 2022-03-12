import React from "react";

import { makeStyles } from "@mui/styles";
import { Card, Typography } from "@mui/material";
import { theme } from "config/theme";

import flag from "assets/SG.svg";
import { PhoneIphone, AccountCircle } from "@mui/icons-material";

const ProfileCard = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <div className={classes.flex}>
          <Typography variant="h6" className={classes.typo}>
            Connie Smith
          </Typography>
          <Typography variant="h6" className={classes.title}>
            S9871234A
          </Typography>
        </div>
        <div className={classes.flex}>
          <Typography variant="body1" className={classes.subtitle}>
            <img src={flag} alt="" style={{ marginRight: "10px" }} /> 33, Female
          </Typography>
          <Typography variant="body1" className={classes.title}>
            <PhoneIphone style={{ marginRight: "5px" }} /> +65 9123 4567
          </Typography>
        </div>
        <div className={classes.flex}>
          <Typography variant="body1" className={classes.subtitle}>
            DOB - April 18, 1988
          </Typography>
          <Typography variant="body1" className={classes.title}>
            <AccountCircle style={{ marginRight: "5px" }} /> XYZ 123 987
          </Typography>
        </div>
      </Card>
    </>
  );
};

export default ProfileCard;

const useStyles = makeStyles({
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  card: {
    boxShadow: "0px 0px 6px #eeeeee !important",
    marginTop: "20px !important",
    padding: "32px 20px",
    minHeight: "115px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 10px",
    },
  },
  title: {
    color: " #8493AE",
    display: "flex",
    alignItems: "center",
    fontSize: "14px !important",
    fontFamily: "Mulish !important",
  },
  typo: {
    fontWeight: "bold !important",
    fontSize: "22px !important",
    color: "#2A3752 !important",
    fontFamily: "Mukta !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px !important",
    },
  },
  subtitle: {
    fontSize: "15px !important",
    color: "#2A3752 !important",
    display: "flex",
    fontFamily: "Mulish !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px !important",
    },
  },
});
