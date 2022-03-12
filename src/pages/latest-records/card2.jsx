import React, { useEffect, useState } from "react";

import { Container, Grid } from "@mui/material";

import ProfileRecords from "./records-profile";
import LatestTabs from "./tabs";
import { useLocation } from "react-router-dom";

import { useParams } from "react-router-dom";
import Chart from "./chart";
import { getPatientsDetailsLatest } from "./helper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

const Card2 = () => {
  //   const classes = useStyles();
  //   const location = useLocation();
  //   const params = useParams();
  //   const [activeTab, setActiveTab] = useState("");
  //   const [tabs, setTabs] = useState([]);
  //   const [latestResult, setLatestResult] = useState({});
  //   const { t } = useTranslation();
  //   const handleChange = (newValue) => {
  //     setActiveTab(newValue);
  //   };

  return (
    <>
      <React.Fragment>
        <CardContent>
          {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
          <Typography variant="h5" component="div">
            Patient Lab Report
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Select a port to display
          </Typography>
          <hr></hr>
          <Button
            variant="outlined"
            style={{
              borderColor: "grey",
              borderRadius: 0,
              height: 30,
              width: "50%",
              color: "black",
            }}
          >
            <h6>
              <b>New Reports</b>
            </h6>
          </Button>
          <Button
            variant="contained"
            style={{
              borderRadius: 0,
              height: 30,
              width: "50%",
              backgroundColor: "#084D89",
            }}
          >
            <h6>
              <b>All Reports</b>
            </h6>
          </Button>
          <div style={{ marginTop: 20 }}>
            <Grid container>
              <Grid item xs={8}>
                <div style={{ color: "blue" }}>[Report Number]</div>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: 30,
                    height: 20,
                    width: 10,
                    borderColor: "Green",
                  }}
                >
                  <h6>New</h6>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <div style={{ color: "grey", marginBottom: 0 }}>
                  <h5 style={{ marginTop: 5, marginBottom: 0 }}>DD/MM/YYYY</h5>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ color: "grey" }}>
                  <h6 style={{ marginTop: 5, marginBottom: 0 }}>
                    3 versions available
                  </h6>
                </div>
              </Grid>
              <Grid item xs={9.8}>
                <div style={{ color: "grey" }}>
                  <h5 style={{ marginTop: 5, marginBottom: 0 }}>
                    [Lab Source]
                  </h5>
                </div>
              </Grid>
              <Grid item xs={2.2}>
                <div style={{ color: "grey" }}>
                  <h6 style={{ marginTop: 5, marginBottom: 0 }}>
                    <img
                      src="https://iconape.com/wp-content/files/ro/367364/svg/ios-arrow-down-logo-icon-png-svg.png"
                      style={{ width: 20 }}
                    ></img>
                  </h6>
                </div>
              </Grid>
            </Grid>
            <hr></hr>
            <Grid container>
              <Grid item xs={8}>
                <div style={{ color: "blue" }}>[Report Number]</div>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: 30,
                    height: 20,
                    width: 10,
                    borderColor: "Green",
                  }}
                >
                  <h6>New</h6>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <div style={{ color: "grey", marginBottom: 0 }}>
                  <h5 style={{ marginTop: 5, marginBottom: 0 }}>9 Jun 2021</h5>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ color: "grey" }}>
                  <h6 style={{ marginTop: 5, marginBottom: 0 }}>
                    3 versions available
                  </h6>
                </div>
              </Grid>
              <Grid item xs={9.8}>
                <div style={{ color: "grey" }}>
                  <h5 style={{ marginTop: 5, marginBottom: 0 }}>
                    [Lab Source]
                  </h5>
                </div>
              </Grid>
              <Grid item xs={2.2}>
                <div style={{ color: "grey" }}>
                  <h6 style={{ marginTop: 5, marginBottom: 0 }}>
                    <img
                      src="https://iconape.com/wp-content/files/ro/367364/svg/ios-arrow-down-logo-icon-png-svg.png"
                      style={{ width: 20 }}
                    ></img>
                  </h6>
                </div>
              </Grid>
            </Grid>
            <hr></hr>
            <Grid container>
              <Grid item xs={8}>
                <div style={{ color: "blue" }}>[Report Number]</div>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: 30,
                    height: 20,
                    width: 10,
                    borderColor: "Green",
                  }}
                >
                  <h6>New</h6>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <div style={{ color: "grey", marginBottom: 0 }}>
                  <h5 style={{ marginTop: 5, marginBottom: 0 }}>8 Sep 2021</h5>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ color: "grey" }}>
                  <h6 style={{ marginTop: 5, marginBottom: 0 }}>
                    {/* 3 versions available */}
                  </h6>
                </div>
              </Grid>
              <Grid item xs={9.8}>
                <div style={{ color: "grey" }}>
                  <h5 style={{ marginTop: 5, marginBottom: 0 }}>
                    [Lab Source]
                  </h5>
                </div>
              </Grid>
              <Grid item xs={2.2}>
                <div style={{ color: "grey" }}>
                  <h6 style={{ marginTop: 5, marginBottom: 0 }}>
                    <img
                      src="https://iconape.com/wp-content/files/ro/367364/svg/ios-arrow-down-logo-icon-png-svg.png"
                      style={{ width: 20 }}
                    ></img>
                  </h6>
                </div>
              </Grid>
            </Grid>
            <hr></hr>
            <Grid container>
              <Grid item xs={8}>
                <div style={{ color: "blue" }}>[Report Number]</div>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: 30,
                    height: 20,
                    width: 10,
                    borderColor: "Green",
                  }}
                >
                  <h6>New</h6>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <div style={{ color: "grey", marginBottom: 0 }}>
                  <h5 style={{ marginTop: 5, marginBottom: 0 }}>7 Sep 2021</h5>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ color: "grey" }}>
                  <h6 style={{ marginTop: 5, marginBottom: 0 }}>
                    3 versions available
                  </h6>
                </div>
              </Grid>
              <Grid item xs={9.8}>
                <div style={{ color: "grey" }}>
                  <h5 style={{ marginTop: 5, marginBottom: 0 }}>
                    [Lab Source]
                  </h5>
                </div>
              </Grid>
              <Grid item xs={2.2}>
                <div style={{ color: "grey" }}>
                  <h6 style={{ marginTop: 5, marginBottom: 0 }}>
                    <img
                      src="https://iconape.com/wp-content/files/ro/367364/svg/ios-arrow-down-logo-icon-png-svg.png"
                      style={{ width: 20 }}
                    ></img>
                  </h6>
                </div>
              </Grid>
            </Grid>
          </div>
          <Typography variant="body2">
            <Pagination
              color="primary"
              count={4}
              showFirstButton
              showLastButton
              //   size="small"
              variant="outlined"
              shape="rounded"
            />
          </Typography>
        </CardContent>
      </React.Fragment>
    </>
  );
};

export default Card2;
