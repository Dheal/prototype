import React from "react";
import { makeStyles } from "@mui/styles";

import { theme } from "config/theme";

import { Card, Typography, Container, Grid } from "@mui/material";
import LoginForm from "components/login-form";

import bioMarkBack from "assets/bioMark-doctor-bg.jpg";

const Login = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          <Grid item xs={12} sm={12} md={4}>
            <LoginForm />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;

const useStyles = makeStyles({
  container: {
    position: "relative",
    height: "calc(100vh - 70px)",
    background: `url(${bioMarkBack}) top center`,
    backgroundSize: "cover",
    width: "100%",
    marginTop: "32px",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 130px)",
    width: "100%",
  },
  headingContainer: {
    marginBottom: "24px",
    padding: "0 15px",
  },
  heading: {
    fontFamily: "Mukta !important",
    fontStyle: "normal !important",
    fontWeight: "700 !important",
    fontSize: "20px !important",
    lineHeight: "33px !important",
    color: "#273859 !important",
    margin: "0px 0 16px 0 !important",
  },
  noticeContainer: {
    marginTop: "48px",
    marginBottom: "24px",
    borderBottom: "1px solid #dee2e6",
    [theme.breakpoints.down("md")]: {
      marginTop: "0px",
    },
  },
  card: {
    padding: "30px 30px 30px 54px",
    [theme.breakpoints.down("sm")]: {
      padding: "15px !important",
    },
  },
  cardHeading: {
    fontFamily: "Mulish !important",
    fontSize: "24px !important",
    fontWeight: "700 !important",
    marginBottom: "22px !important",
  },
  cardText: {
    lineHeight: "1 !important",
    fontFamily: "Mukta !important",
    fontSize: "18px !important",
    fontWeight: "700 !important",
    marginBottom: "20px !important",
  },
  loginContainer: {
    padding: "0 15px",
  },
});
