import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { apiRequest } from "services";

import { Button, Card, Typography } from "@mui/material";
import InputField from "components/input-field";
import LoaderModal from "components/loader-modal";
import { setToken } from "store";
import { theme } from "config/theme";
import { getUser } from "pages/dashboard/helper";
import { setCurrentUser } from "store";

const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const isAt = data.username.includes("@");
    const username = isAt ? data.username.split("@") : [];
    data.username =
      username[1] !== "iqlab.com.sg"
        ? `${data.username}@iqlab.com.sg`
        : data.username;

    const pass = data.password.slice(0, 4);
    data.password = pass !== "0000" ? `0000${data.password}` : data.password;
    setOpen(true);

    const res = await apiRequest({
      type: "post",
      path: "/v2/sessions",
      body: { session: { ...data } },
    });
    if (res?.status === 200) {
      dispatch(setToken(res.data.access_token));
      setOpen(false);
      await getUser(dispatch, setCurrentUser);
      navigate("/dashboard");
    }
    res?.status === 401 && setError(res?.data?.message);
    res?.status === 422 && setError(res?.data?.message);
    res?.status === 404 && setError(`Error: ${res?.status} Not Found`);

    setTimeout(() => {
      setError("");
    }, 3000);

    setOpen(false);
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
            Login
          </Typography>

          <div className={classes.input}>
            <p className={classes.p}>Username</p>
            <InputField
              cClass={classes.inputField}
              type={"text"}
              register={register}
              fieldName={"username"}
              error={errors?.username}
              errorMessage={errors?.username?.message}
            />
          </div>
          <div>
            <p className={classes.p}>Password</p>
            <InputField
              cClass={classes.inputField}
              type={"password"}
              register={register}
              fieldName={"password"}
              error={errors?.password}
              errorMessage={errors?.password?.message}
            />
          </div>

          <div className={classes.btnContainer}>
            <Button
              variant="contained"
              className={classes.btn}
              disabled={errors.firstName || errors.password}
              type="submit"
            >
              Login
            </Button>
          </div>

         
        </Card>
      </form>
      <LoaderModal open={open} setOpen={setOpen} />
    </>
  );
};

export default LoginForm;

const schema = yup
  .object({
    username: yup.string().required("User name is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

const useStyles = makeStyles({
  main: {
    padding: "30px 30px",
    backgroundColor: "#fff",
    minHeight: "200px",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      padding: "15px !important",
    },
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
    marginBottom: "25px !important",
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
    textDecoration: " none",
    textTransform: "initial !important",
    textOutline: " none",
    color: " #fff",
    marginTop: "10px !important",
    width: " 150px",
    fontSize: "16px !important",
    "&:disabled": {
      color: "#fff !important",
      backgroundImage: "linear-gradient(342deg,#4d96d3,#06599E)",
      backgroundColor: "#dc354565 !important",
      boxShadow: "0 10px 40px 0 #001fff61 !important",
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
    fontSize: "12px",
    textDecoration: "underline !important",
  },
  need: {
    color: "#273859",
    fontFamily: "Mulish",
    textDecoration: "none",
    fontSize: "12px",
  },
  input: {
    marginBottom: "16px",
  },
  inputField: {
    width: "100%",
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
