import React, { useEffect, useState } from "react";

import { Container, Grid } from "@mui/material";

import ProfileRecords from "./records-profile";
import LatestTabs from "./tabs";
import { useLocation } from "react-router-dom";

import { useParams } from "react-router-dom";
import Chart from "./chart";
import { getPatientsDetailsLatest } from "./helper";
import Box from "@mui/material/Box";
import Card2 from "./card2";
import Profile from "./profile";
import Card from "@mui/material/Card";
import NewTab from "./newTab";

const LatestRecords = () => {
  const params = useParams();
  const location = useLocation();
  const [patientDetails, setPatientDetails] = useState({});
  const [isChart, setIsChart] = useState(false);

  const handleGetPatient = async () => {
    await getPatientsDetailsLatest(params.id, setPatientDetails);
  };

  useEffect(() => {
    handleGetPatient();
    location.pathname.includes("biomarker")
      ? setIsChart(true)
      : setIsChart(false);
    // eslint-disable-next-line
  }, [params.id, location.pathname]);

  // const bull = (
  //   <Box
  //     component="span"
  //     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  //   >
  //     •
  //   </Box>
  // );

  return (
    <Container style={{ marginLeft: 20, marginRight: 0, maxWidth: 1800 }}>
      <div style={{ marginTop: "30px" }}>
        <Grid container spacing={4}>
          <Grid item xs={3} style={{ paddingLeft: 105 }}>
            <Box sx={{ maxWidth: 340 }}>
              <Card variant="outlined">
                <Profile />
              </Card>
            </Box>
            <div style={{ marginTop: "30px", marginBottom: "30px" }}>
              <Box sx={{ maxWidth: 340 }}>
                <Card variant="outlined">
                  <Card2 />
                </Card>
              </Box>
            </div>
          </Grid>
          <Grid item xs={9} style={{ marginLeft: 0 }}>
            <NewTab />
            {!isChart && <LatestTabs patientId={params.id} />}
            {/* {isChart && <Chart patientId={params.id} />} */}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default LatestRecords;
