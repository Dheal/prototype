import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { apiRequest } from "services";

import { Button, Card, TextField, Typography } from "@mui/material";
import InputField from "components/input-field";
import SuccessModal from "components/success-modal";


const SignUpForm = () => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const temp = { ...data, contact_number: `+65${data.contact_number}` };
    const res = await apiRequest({
      type: "post",
      path: "/v2/doctor/account",
      body: {
        user: {
          country_id: 3,
          ...temp,
        },
      },
    });
    if (res?.status === 200) {
      setSuccess(true);
    }
    res?.status === 422 && setError(res?.data?.message);
    res?.status === 404 && setError(`Error: ${res?.status} Not Found`);

    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className={classes.main}>
          <Typography
            className={classes.loginHeading}
            variant="h4"
            color="#273859"
          >
            Create an Account
          </Typography>

          <p className={classes.error}>
            For Doctors and Healthcare Professionals Only
          </p>
          <div className={classes.input}>
            <p className={classes.p}>Clinic Name</p>
            <InputField
              cClass={classes.inputField}
              inputClass={classes.inputClass}
              type={"text"}
              register={register}
              fieldName={"clinic_name"}
              error={errors?.clinic_name}
              errorMessage={errors?.clinic_name?.message}
            />
          </div>
          <div className={classes.input}>
            <p className={classes.p}>Clinic Address</p>
            <TextField
              className={classes.inputField}
              multiline
              rows={2}
              FormHelperTextProps={{
                className: classes.helperText,
              }}
              {...register("clinic_address")}
              error={errors?.clinic_address}
              helperText={errors?.clinic_address?.message}
            />
          </div>
          <div className={classes.input}>
            <p className={classes.p}>Doctor Name</p>
            <InputField
              cClass={classes.inputField}
              type={"text"}
              register={register}
              fieldName={"doctor_name"}
              error={errors?.doctor_name}
              errorMessage={errors?.doctor_name?.message}
            />
          </div>
          <div className={classes.input}>
            <p className={classes.p}>{`HCI Code (if applicable)`}</p>
            <InputField
              cClass={classes.inputField}
              type={"text"}
              register={register}
              fieldName={"hci_code"}
              error={errors?.hci_code}
              errorMessage={errors?.hci_code?.message}
            />
          </div>
          <div className={classes.input}>
            <p className={classes.p}>Email Address</p>
            <InputField
              cClass={classes.inputField}
              type={"text"}
              register={register}
              fieldName={"email_address"}
              error={errors?.email_address}
              errorMessage={errors?.email_address?.message}
            />
          </div>
          <div className={classes.input}>
            <p className={classes.p}>Contact Number</p>
            <InputField
              cClass={classes.inputField}
              type={"number"}
              register={register}
              fieldName={"contact_number"}
              max={8}
              error={errors?.contact_number}
              errorMessage={errors?.contact_number?.message}
            />
          </div>

          <div className={classes.btnContainer}>
            <Button variant="contained" className={classes.btn} type="submit">
              Submit Request
            </Button>
          </div>

          <p className={classes.need}>
            Need help?
            <br />
            Contact us at{" "}
            <a className={classes.mail} href="mailto:doctors-sg@biomarking.com">
              doctors-sg@biomarking.com
            </a>
          </p>

          <p className={classes.version}>BM 2.1.0</p>
          {error && (
            <div className={classes.errorMessage}>
              <Typography variant="body1" color="#9a0000">
                {error}
              </Typography>
            </div>
          )}
        </Card>
      </form>
      <SuccessModal open={success} setOpen={setSuccess} />
    </>
  );
};

export default SignUpForm;

const schema = yup
  .object({
    clinic_name: yup
      .string()
      .min(5, "Must be 5-50 alphanumeric characters.")
      .max(50, "Must be 5-50 alphanumeric characters.")
      .required(),
    clinic_address: yup
      .string()
      .min(5, "Must be 5-80 characters.")
      .max(80, " Must be 5-80 characters.")
      .required(),
    doctor_name: yup
      .string()
      .min(5, "Must be 5-50 alphanumeric characters.")
      .max(50, "Must be 5-50 alphanumeric characters.")
      .required(),
    hci_code: yup
      .string()
      .test("len", "HCI Code length must be equal to 7", (val) => {
        if (val === undefined) {
          return true;
        }
        return val.length === 0 || val.length === 7;
      }),
    email_address: yup
      .string()
      .email("Please enter valid email address.")
      .required("Please enter valid email address."),
    contact_number: yup
      .string()
      .min(8, "Please enter correct mobile number")
      .max(8, "Please enter correct mobile number")
      .required("Please enter correct mobile number"),
  })
  .required();

const useStyles = makeStyles({
  helperText: {
    position: "absolute !important",
    bottom: "-22px",
  },
  main: {
    padding: "30px 30px",
    backgroundColor: "#fff",
    minHeight: "200px",
    borderRadius: "8px",
  },
  error: {
    color: "#dc3545",
    fontSize: "80%",
    fontWeight: "600 !important",
    lineHeight: "1.67 !important",
    fontFamily: "Mulish",
    margin: "0 !important",
  },
  p: {
    color: "#8493ae",
    fontSize: "14px",
    fontWeight: "600 !important",
    lineHeight: "1.67 !important",
    fontFamily: "Mulish",
    margin: 0,
  },
  span: {
    color: "#007bff",
    fontSize: "12px",
  },
  loginHeading: {
    fontFamily: "Mukta !important",
    fontSize: "24px !important",
    fontWeight: "800 !important",
    marginBottom: "8px !important",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "25px 0px",
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
  version: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#8493ae",
    fontSize: "10px",
    padding: "0px 0x 8px",
  },
  forgot: {
    color: "#273859",
    fontFamily: "Mulish",
    textDecoration: "none",
    fontSize: "12px",
  },
  need: {
    color: "#273859",
    fontFamily: "Mulish",
    textDecoration: "none",
    fontSize: "12px",
  },
  input: {
    marginBottom: "16px",
    position: "relative",
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
  errorMessage: {
    display: "flex",
    padding: "20px",
    border: "1px solid #9a000010",
    borderRadius: "8px",
    backgroundColor: "#ff000030",
  },
  mail: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline !important",
    },
  },
});
