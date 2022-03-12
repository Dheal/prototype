import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  Card,
  Switch,
  Typography,
  Select,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SelectField from "components/select-field";

const PatientModal = ({ open, setOpen }) => {
  const classes = useStyles();

  const { control, register } = useForm();
  return (
    <div>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        classes={{
          root: classes.root,
          paper: classes.paper,
        }}
        className={classes.dialog}
      >
        <Card className={classes.card}>
          <Typography variant="h6" className={classes.title}>
            Deactivate Patient
          </Typography>
          <div className={classes.flex}>
            <Typography variant="h6" className={classes.subtitle}>
              Status:
            </Typography>
            <SelectField
              options={options}
              control={control}
              fieldName="active"
              register={register}
            />
          </div>
          <textarea
            name="reason"
            rows="4"
            className={classes.textarea}
            placeholder="State reason here.."
          ></textarea>
          <div
            className={classes.flex}
            style={{ justifyContent: "space-between" }}
          >
            <Button variant="contained" className={classes.btn1}>
              Cancel
            </Button>
            <Button variant="contained" className={classes.btn}>
              Deactivate
            </Button>
          </div>
        </Card>
      </Dialog>
    </div>
  );
};

export default PatientModal;

const options = ["Active", "InActive"];

const useStyles = makeStyles({
  card: {
    boxShadow: "0px 0px 6px #eeeeee !important",
    padding: "25px",
  },
  title: {
    color: "#273859 !important",
    fontWeight: "bold !important",
    fontFamily: "Mulish !important",
  },
  subtitle: {
    fontFamily: "Mulish !important",
    marginRight: "20px !important",
  },
  root: {
    width: "100% !important",
  },
  paper: {
    maxWidth: "700px !important",
    width: "100% !important",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    marginTop: "15px",
  },
  textarea: {
    borderColor: "#bdbdbd !important",
    fontFamily: "Mukta ",
    marginTop: "15px",
    borderRadius: "5px",
    resize: "none",
    width: "100%",
    "&:focus-visible ": {
      outline: "none !important",
    },
  },
  btn: {
    boxShadow: "none !important",
    backgroundColor: "#C82333 !important",
    textTransform: "capitalize !important",
    fontFamily: "Mukta !important",
  },
  btn1: {
    boxShadow: "none !important",
    backgroundColor: "#bdbdbd !important ",
    textTransform: "capitalize !important",
    fontFamily: "Mukta !important",
  },
});
