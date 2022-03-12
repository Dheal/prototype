import React from "react";

import { makeStyles } from "@mui/styles";
import { Card, Typography } from "@mui/material";

import { theme } from "config/theme";

const AbnormalBiomarkers = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <Typography variant="h6" className={classes.typo}>
          Recently Abnormal Biomarkers
        </Typography>
        <div style={{ height: "175px" }}>
          {tests.map((test, index) => (
            <div className={classes.flex} key={index}>
              <div className={classes.innerFlex}>
                <div>
                  <Typography variant="h6" className={classes.typo1}>
                    {test.testName}
                  </Typography>
                  <Typography variant="h6" className={classes.subtitle}>
                    140-440 (10^9/L)
                  </Typography>
                </div>
                <div className={classes.divColor}>
                  <div className={classes.circle}></div>
                  <Typography variant="body2" className={classes.title1}>
                    138
                  </Typography>
                </div>
              </div>
              <div className={classes.innerFlex}>
                <div>
                  <Typography variant="h6" className={classes.typo1}>
                    Platelets
                  </Typography>
                  <Typography variant="h6" className={classes.subtitle}>
                    140-440 (10^9/L)
                  </Typography>
                </div>
                <div className={classes.divColor}>
                  <div className={classes.circle}></div>
                  <Typography variant="body2" className={classes.title1}>
                    138
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

export default AbnormalBiomarkers;

const tests = [
  {
    testName: "  Platelets",
  },
  {
    testName: "  Platelets",
  },
  {
    testName: "  Platelets",
  },
];

const useStyles = makeStyles({
  divColor: {
    marginLeft: "10px",
    backgroundColor: "#eeeeee",
    borderRadius: "50px",
    display: "flex",
    alignItems: "center",
    padding: "4px 8px",
    marginRight: "10px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
      marginTop: "10px",
    },
  },
  circle: {
    width: "10px",
    height: "10px",
    backgroundColor: "#ef3e4a",
    borderRadius: "50%",
    marginRight: "7px",
  },
  title1: {
    color: "#273859 !important",
    fontWeight: "bold !important",
    fontFamily: "Mulish !important",
  },
  innerFlex: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "14px 0px",

    padding: "0px 13px",

    [theme.breakpoints.down("sm")]: {
      padding: "0px 10px",
    },
  },
  card: {
    boxShadow: "0px 0px 6px #eeeeee !important",
    marginTop: "20px !important",
    maxHeight: "180px",
    overflowY: "auto !important",
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
    fontSize: "20px !important",
    color: "#2A3752 !important",
    borderBottom: "1px solid #D9DFEB",
    fontFamily: "Mukta !important",
    padding: "8px 13px",
    position: "sticky",
    top: 0,
    backgroundColor: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px !important",
      padding: "8px 10px",
    },
  },
  typo1: {
    fontWeight: "bold !important",
    fontSize: "18px !important",
    color: "#2A3752 !important",
    fontFamily: "Mukta !important",
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
