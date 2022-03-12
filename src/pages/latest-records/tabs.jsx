import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { IconButton, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Latest from "./latest";
import ResultsTrends from "./results-trends";
import { getPatientsDetails } from "./helper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

const LatestTabs = ({ patientId }) => {
  const classes = useStyles();
  const location = useLocation();
  const params = useParams();
  const [activeTab, setActiveTab] = useState("");
  const [tabs, setTabs] = useState([]);
  const [latestResult, setLatestResult] = useState({});
  const { t } = useTranslation();
  const handleChange = (newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    getPatientsDetails(patientId, setLatestResult);
    setTabs([
      { value: `/patient/${params.id}`, label: "Latest", key: "latest" },
      {
        value: `/patient/${params.id}/result-summary`,
        label: "Results & Trends",
        key: "result_trends",
      },
    ]);
    setActiveTab(
      location.pathname.includes("result")
        ? `/patient/${params.id}/result-summary`
        : `/patient/${params.id}`
    );
    // eslint-disable-next-line
  }, [params.id, location.pathname]);

  return (
    <div style={{ marginTop: 20 }}>
      <div className={`${classes.tabsContainer} ${classes.tabsC}`}>
        <div className={`${classes.tabs} ${classes.tabsContainer1}`}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Button
                variant="contained"
                style={{
                  borderColor: "grey",
                  // borderRadius: 0,
                  height: 40,
                  width: 200,
                  color: "white",
                  fontSize: 10,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  backgroundColor: "#084D89",
                }}
              >
                <b>Biomark Reportted Report</b>
              </Button>
              <Button
                variant="outlined"
                style={{
                  height: 40,
                  width: 200,
                  fontSize: 10,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  color: "black",
                }}
              >
                <b>Lab Reportted Report</b>
              </Button>
              <Button
                variant="outlined"
                style={{
                  height: 40,
                  width: 5,
                  fontSize: 10,
                  borderWidth: 0,
                  padding: 0,
                  // borderTopLeftRadius: 0,
                  // borderBottomLeftRadius: 0,
                  // borderTopRightRadius: 10,
                  // borderBottomRightRadius: 10,
                  color: "black",
                }}
              >
                <img
                  src="data:image/png;base64,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"
                  style={{
                    width: 20,
                    borderRadius: "50%",
                    paddingTop: 0,
                    margin: 0,
                  }}
                />
              </Button>
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                color: "grey",
                fontSize: 12,
                marginTop: 7,
                textAlign: "end",
              }}
            >
              <div>Latest Lab Update : DD/MM/YYYY</div>
              <div> PDF Last Downloaded : DD/MM/YYYY</div>
            </Grid>
            <Grid item xs={4}>
              <Card variant="outlined" style={{ height: "100%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <img
                      src="https://cdn1.iconfinder.com/data/icons/pointed-edge-web-navigation/115/refresh-grey-512.png"
                      style={{
                        width: 30,
                        borderRadius: "50%",
                        paddingTop: 0,
                        marginTop: 10,
                        marginLeft: 10,
                      }}
                    />
                    <img
                      src="https://www.lter-europe.net/projects/PPP/get_app_grey_192x192.png/image"
                      style={{
                        width: 30,
                        borderRadius: "50%",
                        paddingTop: 0,
                        marginTop: 10,
                        marginLeft: 20,
                      }}
                    />
                    <img
                      src="https://www.pngkit.com/png/detail/51-512913_image-result-for-messaging-icon-find-image-messages.png"
                      style={{
                        width: 30,
                        // borderRadius: "50%",
                        paddingTop: 0,
                        marginTop: 10,
                        marginLeft: 20,
                      }}
                    />
                    <img
                      src="https://icones.pro/wp-content/uploads/2022/02/icone-de-cloche-grise.png"
                      style={{
                        width: 30,
                        borderRadius: "50%",
                        paddingTop: 0,
                        marginTop: 10,
                        marginLeft: 20,
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} style={{ paddingLeft: 0, marginTop: 10 }}>
                    <Button
                      variant="outlined"
                      style={{
                        height: 20,
                        width: "100%",
                        fontSize: 10,
                        color: "blue",
                        backgroundColor: "#DDE1EB",
                      }}
                    >
                      <b>Mark as Reviewed</b>
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          {/* {tabs.map(({ value, label, key }, index) => (
            <Link className={classes.link} to={value} key={index}>
              <IconButton
                className={`${classes.btn} ${classes.btn2}`}
                onClick={() => {
                  console.log("aaaaaa");
                  handleChange(value);
                }}
              >
                <span
                  className={`${classes.tab} ${classes.tabClass} ${
                    activeTab === value &&
                    `${classes.tabActive} ${classes.activeTabClass}`
                  }`}
                  key={index}
                >
                  {t("label." + key) || label}
                </span>
              </IconButton>
            </Link>
          ))} */}
        </div>
      </div>
      <div className={`${classes.tabsContainer} ${classes.tabsC}`}>
        <div className={`${classes.tabs} ${classes.tabsContainer1}`}>
          <Card
            variant="outlined"
            style={{ height: 40, marginTop: 10, backgroundColor: "#EBEEF4" }}
          >
            <Grid container spacing={2}>
              <Grid item xm={3}>
                <Typography
                  variant="h7"
                  component="div"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",

                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      mx: "auto",
                      width: 20,
                      height: 20,
                      //   backgroundColor: "black",
                    }}
                  >
                    <img
                      src="data:image/png;base64,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"
                      style={{
                        width: 20,
                        borderRadius: "50%",
                        paddingTop: 0,
                        marginTop: 10,
                        marginLeft: 20,
                      }}
                    />
                  </Box>
                </Typography>
              </Grid>
              <Grid
                item
                xm={6}
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  color: "grey",
                }}
              >
                Would you like to customize the look and feel of this report?
              </Grid>
              <Grid item xs={7} style={{ textAlign: "end" }}>
                <Button
                  variant="contained"
                  style={{
                    height: 30,
                    width: 20,
                    fontSize: 10,
                    color: "white",
                    marginTop: 5,
                    padding: 0,
                    backgroundColor: "#084D89",
                  }}
                >
                  <b>Yes</b>
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    height: 30,
                    width: 20,
                    fontSize: 10,
                    color: "black",
                    backgroundColor: "white",
                    marginTop: 5,
                    padding: 0,
                    marginLeft: 5,
                  }}
                >
                  <b>No</b>
                </Button>
              </Grid>
            </Grid>
            {/* <Grid container spacing={2}>
              <Grid item xs={2}>
                <img
                  src="data:image/png;base64,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"
                  style={{
                    width: 20,
                    borderRadius: "50%",
                    paddingTop: 0,
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={5}>
                x
              </Grid>
            </Grid> */}
          </Card>
        </div>
      </div>
      {activeTab === tabs?.[0]?.value && (
        <>
          <Latest
            latestResult={latestResult}
            setLatestResult={setLatestResult}
            patientId={patientId}
          />
        </>
      )}
      {activeTab === tabs?.[1]?.value && (
        <ResultsTrends latestResult={latestResult} patientId={patientId} />
      )}
    </div>
  );
};

export default LatestTabs;

const useStyles = makeStyles({
  link: { textDecoration: "none" },
  tabsContainer: {
    width: "100%",
    marginTop: "20px",
  },
  tab: {
    fontFamily: "Poppins !important",
    fontWeight: "500 !important",
    fontSize: "14px !important",
    color: "#8493AE !important",
    paddingBottom: "0px !important",
    padding: "0px 15px !important",
  },
  tabActive: {
    color: "#06599E !important",
    borderBottom: "2px solid #06599E !important",
  },
  btn: {
    borderRadius: "0 !important",
  },

  tabsC: {
    marginTop: "0px !important ",
  },
  tabClass: {
    marginTop: "0px !important ",
  },
  activeTabClass: {
    borderBottom: "none !important",
    color: "white !important",

    borderRadius: "0px !important",
    backgroundColor: "#06599E !important",
    padding: "10px 20px !important",
  },
  btn2: {
    backgroundColor: "#d9dfeb99 !important",
    borderRadius: "0px !important",
    padding: "0px !important",
    height: "41px",
  },
});
