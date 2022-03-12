import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { Card, Grid, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { theme } from "config/theme";
import PdfRecord from "components/pdf";
import { apiRequest } from "services";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Latest = ({ latestResult, patientId }) => {
  const classes = useStyles();
  const [abnormalMarker, setAbnormalMarker] = useState({});
  const { t } = useTranslation();
  const getAbnormalBioMarkers = async () => {
    const res = await apiRequest({
      type: "get",
      path: `/v2/doctor/patient/${patientId}/latest_abnormal_biomarkers/`,
    });
    if (res?.status === 200) {
      setAbnormalMarker(res.data);
    }
  };

  useEffect(() => {
    getAbnormalBioMarkers();
    // eslint-disable-next-line
  }, [patientId]);

  return (
    <div>
      {latestResult?.lab_status === false && (
        <div className={classes.resultNoData}>
          <span className={classes.resultNoDataText}>No Data Yet</span>
        </div>
      )}
      {latestResult?.lab_status === true && (
        <Grid container spacing={4} style={{ marginBottom: 20 }}>
          <Grid item xs={12} sm={12} md={7} lg={8}>
            <PdfRecord patientId={patientId} latestResult={latestResult} />
            <div style={{ marginTop: 30, textAlign: "center" }}>
              <div>
                <h2>BioMark Formatted Report PDF</h2>
              </div>
              <div style={{ marginTop: 20, color: "grey" }}>
                Click below to generate a BioMark formatted report as a
              </div>
              <div style={{ color: "grey" }}>
                PDF which will also include an encrypted QR code.
              </div>
              <Button
                variant="contained"
                style={{
                  borderColor: "grey",
                  // borderRadius: 0,
                  height: 40,
                  width: 250,
                  color: "white",
                  fontSize: 10,
                  marginTop: 15,
                  backgroundColor: "#084D89",
                }}
              >
                <b>Generate BioMark Report PDF</b>
              </Button>
            </div>
          </Grid>
          <>
            <Grid item xs={12} sm={12} md={5} lg={4}>
              <Card className={`${classes.card} ${classes.abnormal}`}>
                <Typography variant="h6" className={classes.title}>
                  {t("label.abnormal_biomarkers")}
                </Typography>
                <div className={classes.border}></div>
                {abnormalMarker.groups?.map(({ header_name, biomarkers }) => (
                  <>
                    <Typography variant="body1" className={classes.phone}>
                      {header_name}
                    </Typography>
                    {biomarkers.map(
                      ({
                        biomarker_id,
                        name,
                        observation_value,
                        reference_range,
                        unit,
                      }) => (
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/patient/${patientId}/biomarker/${biomarker_id}`}
                        >
                          <div
                            className={classes.flex}
                            style={{ marginLeft: "23px" }}
                          >
                            <div className={classes.flex1}>
                              <Typography
                                variant="body2"
                                className={classes.title1}
                              >
                                {name}
                              </Typography>
                              <Typography
                                variant="body2"
                                className={classes.phone1}
                              >
                                {`${reference_range} (${unit})`}
                              </Typography>
                            </div>
                            <div
                              className={classes.flex}
                              style={{
                                marginLeft: "10px",
                                backgroundColor: "#eeeeee",
                                borderRadius: "50px",
                                padding: "4px 8px",
                                marginTop: "0px",
                                marginRight: "10px",
                              }}
                            >
                              <div
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  backgroundColor:
                                    +reference_range?.split(" - ")?.[0] <=
                                      +observation_value &&
                                    +reference_range?.split(" - ")?.[1] >=
                                      +observation_value
                                      ? "#17c37b"
                                      : "#ef3e4a",
                                  borderRadius: "50%",
                                  marginRight: "7px",
                                }}
                              ></div>
                              <Typography
                                variant="body2"
                                className={classes.title1}
                              >
                                {observation_value}
                              </Typography>
                            </div>
                          </div>
                          <div className={classes.border1}></div>
                        </Link>
                      )
                    )}
                  </>
                ))}
              </Card>
              {latestResult?.unsupported.length !== 0 && (
                <Card className={classes.card} style={{ padding: "0px" }}>
                  <div
                    className={classes.flex}
                    style={{ justifyContent: "space-between" }}
                  >
                    <Typography variant="h6" className={classes.title}>
                      Other Biomarkers
                    </Typography>
                    <Tooltip
                      title="Please review the PDF for the following biomarkers as their abnormal/normal status cannot be automatically detected."
                      placement="top"
                      arrow
                      style={{ cursor: "pointer" }}
                    >
                      <InfoOutlinedIcon
                        style={{ color: "#273859", marginRight: "15px" }}
                      />
                    </Tooltip>
                  </div>
                  <div className={classes.border}></div>
                  {latestResult?.unsupported?.map(({ name, code }, index) => (
                    <div key={index}>
                      <Typography
                        variant="body2"
                        className={classes.subtitle}
                        style={{ cursor: "pointer" }}
                      >
                        {`${name} (${code})`}
                      </Typography>
                      {latestResult?.unsupported.length - 1 !== index && (
                        <div className={classes.border1}></div>
                      )}
                    </div>
                  ))}
                </Card>
              )}
            </Grid>
          </>
        </Grid>
      )}
    </div>
  );
};

export default Latest;

const useStyles = makeStyles({
  btn: {
    boxShadow: "none !important",
    backgroundColor: "#06599E !important",
    textTransform: "capitalize !important",
    fontFamily: "Mukta !important",
    marginRight: "10px !important",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "20px !important",
      marginTop: "10px !important",
    },
  },

  card: {
    boxShadow: "0px 0px 6px #eeeeee !important",
    marginTop: "20px !important",
    padding: "15px 0px",
  },

  border: {
    borderBottom: "1px solid #d9dfeb",
    width: "100%",
  },
  border1: {
    borderBottom: "1px dashed #d9dfeb",
    width: "100%",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    justifyContent: "space-between",
  },
  flex2: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  flex1: {
    display: "flex",
    flexDirection: "column",
  },
  phone: {
    color: "#8493AE !important",
    fontWeight: "600 !important",
    fontFamily: "Mulish !important",
    marginLeft: "23px !important",
    marginTop: "15px !important",
  },
  phone1: {
    color: "#8493AE !important",
    fontWeight: "600 !important",
    fontFamily: "Mulish !important",
  },
  title: {
    color: "#273859 !important",
    fontWeight: "bold !important",
    marginLeft: "20px !important",
    fontFamily: "Mulish !important",
  },
  title1: {
    color: "#273859 !important",
    fontWeight: "bold !important",
    fontFamily: "Mulish !important",
  },
  subtitle: {
    color: "#273859 !important",
    fontWeight: "bold !important",
    fontFamily: "Mulish !important",
    marginLeft: "23px !important",
    margin: "10px 0 !important",
  },
  resultNoData: {
    display: "flex",
    padding: "16px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    marginTop: "13px",
    boxShadow: "0 10px 40px -20px rgb(56 73 107 / 20%)",
  },
  resultNoDataText: {
    color: "#212529",
    fontWeight: 700,
    fontSize: "16px",
    fontFamily: "Mulish",
  },
  abnormal: {
    minHeight: "130px",
  },
});
