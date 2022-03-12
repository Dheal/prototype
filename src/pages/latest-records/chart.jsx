import React, { useEffect, useState } from "react";
import Charts from "components/chart";
import { makeStyles } from "@mui/styles";
import { Button, Card, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "services";
import { toPascalCase } from "./helper";

const ChartRecords = () => {
  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();
  const [marker, setMarker] = useState({});

  const getMarkerData = async () => {
    const res = await apiRequest({
      type: "post",
      path: `/v1/doctor/patient/marker`,
      body: { id: params.id, code: params?.markerId },
    });
    if (res?.status === 200) {
      setMarker({
        ...res.data,
        results: res.data.results.sort(
          (f, s) =>
            new Date(s.date_of_test).getTime() -
            new Date(f.date_of_test).getTime()
        ),
      });
    }
  };

  useEffect(() => {
    getMarkerData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className={classes.flex}>
        <Typography variant="h6" className={classes.title}>
          {`${marker?.results?.[0]?.study?.name || "N/A"} (${
            marker?.results?.[0]?.study?.code || "N/A"
          })`}
        </Typography>
        <Button
          className={classes.link}
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon style={{ color: "#ffffff", marginRight: "5px" }} />
          Back
        </Button>
      </div>
      <div style={{ borderBottom: "1px solid #eeeeee" }}>
        <Typography
          variant="body1"
          className={classes.title}
          style={{
            paddingBottom: "15px",
            borderBottom: "1px solid #273859",
            width: "60px",
          }}
        >
          History
        </Typography>
      </div>

      <Card className={classes.card}>
        <div className={classes.rangeContainer}>
          <Typography
            variant="body1"
            className={classes.title}
            style={{ fontSize: "12px" }}
          >
            {`Reference Ranges (${
              marker?.results?.[0]?.study?.unit || "N/A"
            }):`}
          </Typography>
          <div className={classes.flex}>
            {ranges.map((val, index) => (
              <div key={index}>
                <span
                  className={classes.legend}
                  style={{
                    backgroundColor: index === 1 ? "#17c37b" : "#ef3e4a",
                  }}
                >
                  {val[0].toUpperCase()}
                </span>
                <span
                  className={classes.legendText}
                  style={{ color: "#8493ae" }}
                >
                  {toPascalCase(val)}
                </span>
                <span
                  className={classes.legendText}
                  style={{ fontWeight: "bolder" }}
                >{`${index === 0 ? "<" : index === 2 ? ">" : ""}${
                  +marker?.results?.[0]?.study?.[`${val}_min`] || ""
                }${index === 1 ? " - " : ""}${
                  +marker?.results?.[0]?.study?.[`${val}_max`] || ""
                }`}</span>
              </div>
            ))}
          </div>
        </div>

        <Charts marker={marker} />
        <div
          style={{
            marginTop: "20px",
            width: "100%",
            overflowX: "auto",
          }}
        >
          <div className={classes.accordionContent}>
            <div
              style={{
                borderRight: "1px dashed rgb(132 147 174 / 66%)",
                padding: "15px 8px",
                width: "134px",
              }}
            >
              <Typography
                variant="body2"
                style={{
                  width: "135px",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
                className={classes.title2}
              >
                BIOMARKER
              </Typography>
            </div>
            {marker?.results?.map(({ date_of_test }, index) => (
              <div
                className={`${classes.dateRegular} ${
                  index === 0 ? classes.dateActive : ""
                }`}
              >
                <p className={classes.title4}>
                  {new Date(date_of_test).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }) || ""}
                </p>
              </div>
            ))}
          </div>
          <div className={classes.accordionContent}>
            <div
              style={{
                borderRight: "1px dashed rgb(132 147 174 / 66%)",
                padding: "20px 8px",
                width: "134px",
              }}
            >
              <Typography
                variant="body2"
                style={{
                  width: "135px",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
                className={classes.title2}
              >
                {marker?.results?.[0].study.name}
              </Typography>
            </div>
            {marker?.results?.map(({ study }, index) => (
              <div
                key={index}
                style={{
                  borderRight: "1px dashed rgb(132 147 174 / 66%)",
                  padding: "20px 8px",
                  width: "130px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className={classes.flex1}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#eeeeee",
                    borderRadius: "50px",
                    padding: "4px 8px",
                    marginTop: "0px",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor:
                        study?.normal_min <= +study?.observation_value &&
                        study?.normal_max >= +study?.observation_value
                          ? "#17c37b"
                          : "#ef3e4a",
                      borderRadius: "50%",
                      marginRight: "7px",
                    }}
                  ></div>
                  <Typography variant="body2" className={classes.title2}>
                    {study.observation_value}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChartRecords;

const useStyles = makeStyles({
  accordionContent: {
    border: "1px solid #d9dfeb",
    display: "flex",
    alignItems: "center",
    minWidth: "fit-content",
  },

  title2: {
    color: "#273859 !important",
    fontWeight: "bold !important",
    fontFamily: "Mulish !important",
  },
  link: {
    textDecoration: "none !important",
    cursor: "pointer !important",
    backgroundColor: "#273859 !important",
    color: "#ffffff !important ",
    textTransform: "capitalize !important",
    padding: "10px 20px !important",
    fontWeight: "bold !important",
    fontFamily: "Mulish !important",
    boxShadow: "0px 0px 13px 0px rgb(0 0 0 / 30%) !important",
    borderRadius: "30px !important",
  },
  flex1: {
    display: "flex",
    alignItems: "center",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    boxShadow: "0px 0px 6px #eeeeee !important",
    marginTop: "20px !important",
    padding: "15px 0px",
  },

  title: {
    color: "#273859 !important",
    fontWeight: "bold !important",
    fontFamily: "Mulish !important",
  },
  title1: {
    color: "#ffffff !important",
    fontWeight: "bold !important",
    fontFamily: "Mulish !important",
    marginLeft: "10px !important",
  },
  title4: {
    fontWeight: "bold !important",
    fontFamily: "Mulish !important",
    marginLeft: "10px !important",
  },
  dateActive: {
    borderRight: "1px dashed rgb(132 147 174 / 66%)",
    padding: "20px 8px",
    width: "130px",
    display: "flex",
    height: "10px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#273859",
    color: "#fff",
  },
  dateRegular: {
    borderRight: "1px dashed rgb(132 147 174 / 66%)",
    padding: "20px 8px",
    width: "130px",
    display: "flex",
    height: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
  legend: {
    padding: "6px",
    fontFamily: "Mulish",
    fontSize: "10px",
    paddingTop: "3px",
    color: "#fff",
  },
  rangeContainer: {
    padding: "18px",
  },
  legendText: {
    fontFamily: "Mulish",
    fontSize: "12px",
    margin: "0 5px",
  },
});

const ranges = ["low", "normal", "high"];
