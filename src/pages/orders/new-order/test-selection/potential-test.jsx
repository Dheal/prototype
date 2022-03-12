import React from "react";

import { makeStyles } from "@mui/styles";
import { Card, Typography } from "@mui/material";

import { theme } from "config/theme";

const PotentialTests = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <Typography variant="h6" className={classes.typo}>
          Potential tests to consider
        </Typography>
        <div style={{ height: "175px" }}>
          <div className={classes.flex}>
            {tests.map((test, index) => (
              <div className={classes.divColor} key={index}>
                <Typography variant="body2" className={classes.title1}>
                  {test.testName}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
};

export default PotentialTests;

const tests = [
  {
    testName: " P.RFT",
  },
  {
    testName: " P.M50",
  },
  {
    testName: " P.HbA1c",
  },
];

const useStyles = makeStyles({
  divColor: {
    backgroundColor: "#eeeeee",
    borderRadius: "50px",
    display: "flex",
    alignItems: "center",
    padding: "4px 12px",
    marginTop: "14px",
    marginRight: "10px",
  },

  title1: {
    color: "#273859 !important",
    fontWeight: "bold !important",
    fontFamily: "Mulish !important",
  },

  flex: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
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
});
