import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { theme } from "config/theme";

import InputField from "components/input-field";

import { apiRequest } from "services";

const style = {
  position: "absolute",
  top: 250,
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 200,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const ForgetPass = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const res = await apiRequest({
      type: "post",
      path: "/v2/doctor/account/request_reset_password_link",
      body: {
        ...data,
      },
    });

    res?.status === 404 && setError(res?.data?.message);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.forgetCard} sx={style}>
          <div className={classes.process}>
            <Typography className={classes.request} color={"#273859"}>
              Forgot Your Password?
            </Typography>
            <Typography className={classes.processText} color={"#273859"}>
              Don't worry! We'll help get you back on track.
            </Typography>
            <div className={classes.input}>
              <p className={classes.p}>Email Address</p>
              <InputField
                cClass={classes.inputField}
                inputClass={classes.inputClass}
                type={"text"}
                register={register}
                fieldName={"email_address"}
                error={error}
                errorMessage={error}
              />
            </div>
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                className={classes.btn}
                type="submit"
                disabled={errors?.email_address}
              >
                Send Rest Link
              </Button>
            </div>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default ForgetPass;

const schema = yup
  .object({
    email_address: yup.string().email().required(),
  })
  .required();

const useStyles = makeStyles({
  request: {
    fontWeight: "700 !important",
    fontSize: "24px !important",
    fontFamily: "Mukta !important",
  },
  processText: {
    fontSize: "12px !important",
    color: "#8493ae !important",
    lineHeight: "1.67 !important",
  },
  p: {
    color: "#8493ae",
    fontSize: "12px",
    fontWeight: "400 !important",
    lineHeight: "1.67 !important",
    fontFamily: "Mulish",
    margin: 0,
  },
  input: {
    marginBottom: "16px",
  },
  inputField: {
    width: "100%",
  },
  inputClass: {
    padding: "8px 14px !important",
    "& .MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "8px 14px !important",
    },
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "15px 0",
    width: "100%",
  },
  btn: {
    height: "48px !important",
    borderRadius: " 44px !important",
    backgroundImage: "linear-gradient(342deg,#4d96d3,#06599E)",
    textTransform: "initial !important",
    textDecoration: " none",
    textOutline: " none",
    color: " #fff",
    width: " 155px",
    fontSize: "16px !important",
    "&:disabled": {
      color: "#fff !important",
      backgroundImage: "linear-gradient(342deg,#4d96d3,#06599E)",
      boxShadow: "0 10px 40px 0 #001fff61 !important",
      backgroundColor: "#dc354565 !important",
      borderColor: "#dc3545 !important",
      opacity: "0.65",
    },
  },
  forgetCard: {
    width: "300px",
    [theme.breakpoints.down("sm")]: {
      width: "250px",
    },
  },
});
