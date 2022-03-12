import React from "react";

import { makeStyles } from "@mui/styles";
import { Card, Typography } from "@mui/material";

import { theme } from "config/theme";
import { useForm } from "react-hook-form";
import InputField from "components/input-field";
import SwitchCompo from "components/switch";

const TestsSummary = () => {
  const classes = useStyles();
  const { register } = useForm();

  return (
    <>
      <Card className={classes.card}>
        <div className={classes.flex}>
          <Typography variant="h6" className={classes.typo}>
            Summary
          </Typography>
          <Typography variant="body1" className={classes.title}>
            *Mandatory Selections
          </Typography>
        </div>
        <div className={classes.inputDiv}>
          <InputField
            type={"text"}
            register={register}
            fieldName={"text"}
            label="Current and previous diagnosis"
            multiline
            rows={4}
          />
        </div>
        <div className={classes.inputDiv}>
          <InputField
            type={"text"}
            register={register}
            fieldName={"text"}
            label="Concurrent Drug Therapy"
            multiline
            rows={4}
          />
        </div>
        <div className={classes.inputDiv}>
          <InputField
            type={"text"}
            register={register}
            fieldName={"text"}
            label="Clinical Indications*"
            multiline
            rows={4}
          />
        </div>
        <div className={classes.inputDiv}>
          <Typography variant="body1" className={classes.typo}>
            Send copy to payor/ physicians
          </Typography>
          <Typography variant="body1" className={classes.cc}>
            CC :
          </Typography>
          <div
            style={{
              borderBottom: "1px solid #8493AE ",
              width: "100%",
              height: "1px",
            }}
          ></div>
          <Typography variant="body1" className={classes.cc}>
            Subject :
          </Typography>
          <div className={classes.flex1}>
            <Typography variant="body1" className={classes.cc}>
              Routine
            </Typography>
            <SwitchCompo />
          </div>
        </div>
      </Card>
    </>
  );
};

export default TestsSummary;

const useStyles = makeStyles({
  title: {
    color: " #EA4C59 !important",
    fontFamily: "Mulish !important",
    fontSize: "12px !important",
  },
  inputDiv: {
    padding: "8px 13px",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 10px",
    },
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 13px",
    borderBottom: "1px solid #D9DFEB",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 10px",
    },
  },
  flex1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  card: {
    boxShadow: "0px 0px 6px #eeeeee !important",
    marginTop: "20px !important",
  },

  typo: {
    fontWeight: "bold !important",
    fontSize: "17px !important",
    color: "#2A3752 !important",

    fontFamily: "Mukta !important",

    position: "sticky",
    top: 0,
    backgroundColor: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px !important",
    },
  },
  cc: {
    fontWeight: "bold !important",
    fontSize: "20px !important",
    color: " #8493AE !important",

    fontFamily: "Mukta !important",

    position: "sticky",
    top: 0,
    backgroundColor: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px !important",
    },
  },
});
