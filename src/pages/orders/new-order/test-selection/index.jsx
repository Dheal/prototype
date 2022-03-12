import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

import ProfileCard from "./profile-card";
import AbnormalBiomarkers from "./abnormal-biomarkers";
import PotentialTests from "./potential-test";
import TestsSummary from "./summary-reorder";
import SearchLabs from "./search-labs";

const TestSelection = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <ProfileCard />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <AbnormalBiomarkers />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <PotentialTests />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={9}>
          <SearchLabs />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <TestsSummary />
        </Grid>
      </Grid>
    </>
  );
};

export default TestSelection;

const useStyles = makeStyles({
  grid: {
    margin: "10px 0px",
  },
});
