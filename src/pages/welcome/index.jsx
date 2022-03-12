import React from "react";
import { makeStyles } from "@mui/styles";

import Navbar from "components/navbar";

import bioBack from "assets/bioMark-doctor-bg.jpg";

const Welcome = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <Navbar />
      </div>
    </>
  );
};

export default Welcome;

const useStyles = makeStyles({
  container: {
    position: "relative",
    height: "calc(100vh - 70px)",
    background: `url(${bioBack}) top center`,
    backgroundSize: "cover",
    width: "100%",
  },
});
