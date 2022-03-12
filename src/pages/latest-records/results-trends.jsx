import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RemoveRedEye, FileDownload } from "@mui/icons-material";
import { apiRequest } from "services";
import { downloadPdf, reviewReport } from "./helper";
import PdfModal from "components/pdf-modal";

const ResultsTrends = ({ latestResult, patientId }) => {
  const classes = useStyles();
  const params = useParams();
  const [expanded, setExpanded] = useState(false);
  const [tests, setTests] = useState({});
  const [testsData, setTestsData] = useState({});
  const [pdfOpen, setPdfOpen] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getTests = async () => {
    const res = await apiRequest({
      type: "post",
      path: `/v1/doctor/patient/biomarker`,
      body: { id: params.id },
    });
    if (res?.status === 200) {
      setTests(res.data);
    }
  };

  const getBioMarkersGroups = async (id) => {
    const res = await apiRequest({
      type: "post",
      path: `/v1/doctor/patient/biomarker_group`,
      body: { id: params.id, group_id: id },
    });
    if (res?.status === 200) {
      setTestsData((prev) => {
        return { ...prev, [id]: res?.data?.biomarkers };
      });
    }
  };

  useEffect(() => {
    getTests();
    // eslint-disable-next-line
  }, [params.id]);

  return (
    <>
      {tests?.labs?.length === 0 && (
        <div className={classes.resultNoData}>
          <span className={classes.resultNoDataText}>No Data Yet</span>
        </div>
      )}
      {tests?.labs?.length !== 0 && (
        <>
          <div
            style={{
              marginTop: "10px",
              maxWidth: "850px",
              width: "100%",
              overflowX: "auto",
            }}
          >
            <Card className={classes.card}>
              <div className={classes.flex}>
                <div style={{ width: "157px" }}>
                  <Typography
                    variant="h5"
                    className={classes.typo}
                    style={{ padding: "0px 10px" }}
                  >
                    Biomarker
                  </Typography>
                </div>

                {tests?.labs?.map(
                  ({ date_of_test, status, migrated }, index) => (
                    <div
                      key={index}
                      style={{
                        width: "130px",
                        borderLeft: "1px dashed rgb(132 147 174 / 66%)",
                        borderRight: "1px dashed rgb(132 147 174 / 66%) ",
                        padding: "10px",
                        marginLeft: "-1px",
                      }}
                    >
                      <Typography variant="h6" className={classes.typo}>
                        {new Date(date_of_test).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }) || "-"}
                      </Typography>
                      <Button
                        className={classes.typo1}
                        onClick={() => {
                          if (migrated && status) {
                            return;
                          }
                          reviewReport(tests?.labs[index], params.id, index);
                        }}
                      >
                        {migrated && status ? "Reviewed" : "Mark As Reviewed"}
                      </Button>
                    </div>
                  )
                )}
              </div>

              <div
                className={classes.flex}
                style={{ backgroundColor: "rgb(217 223 235 / 49%)" }}
              >
                <div style={{ width: "157px" }}>
                  <Typography
                    variant="h5"
                    className={classes.typo}
                    style={{ padding: "0px 10px" }}
                  >
                    Source
                  </Typography>
                </div>
                {tests?.labs?.map(({ provider_name }, index) => (
                  <div
                    key={index}
                    style={{
                      width: "130px",
                      borderLeft: "1px dashed rgb(132 147 174 / 66%)",
                      borderRight: "1px dashed rgb(132 147 174 / 66%)",
                      padding: "10px",
                      marginLeft: "-1px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      className={classes.typo}
                      style={{ textAlign: "center" }}
                    >
                      {provider_name}
                    </Typography>
                    {latestResult?.latest_pdf && (
                      <div
                        className={classes.flex}
                        style={{ justifyContent: "center" }}
                      >
                        <IconButton
                          className={classes.iconEye}
                          onClick={() => {
                            setPdfOpen(patientId);
                          }}
                        >
                          <RemoveRedEye style={{ color: "white" }} />
                        </IconButton>
                        <div
                          className={classes.icon}
                          onClick={() => {
                            downloadPdf(latestResult, params);
                          }}
                        >
                          <FileDownload style={{ color: "white" }} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {tests?.groups?.map(({ header_name, id }) => (
            <div
              style={{
                marginTop: "0px",
                maxWidth: "850px",
                width: "100%",
                overflowX: "auto",
              }}
              key={id}
            >
              <Accordion
                elevation={0}
                className={classes.accordionCard}
                expanded={expanded === id}
                onChange={handleChange(id)}
                onClick={() => {
                  getBioMarkersGroups(id);
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="panel1bh-header"
                >
                  <Typography variant="h6" className={classes.typo}>
                    {header_name}
                  </Typography>
                </AccordionSummary>

                {testsData?.[id]?.map(({ data }, index) => (
                  <AccordionDetails
                    key={index}
                    classes={{
                      root: classes.root,
                    }}
                    className={classes.accordionContent}
                  >
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/patient/${params.id}/biomarker/${data[0]?.biomarker_id}`}
                    >
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
                          className={classes.title1}
                        >
                          {data[0]?.name}
                        </Typography>
                      </div>
                    </Link>

                    {data.map(
                      ({ observation_value, finding, reference_range }) => (
                        <div
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
                            className={classes.flex}
                            style={{
                              marginLeft: "10px",
                              backgroundColor: "#eeeeee",
                              borderRadius: "50px",
                              padding: "4px 8px",
                              marginTop: "0px",
                            }}
                          >
                            {finding === "normal" && (
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
                            )}
                            {finding === "normal" ? (
                              <Typography
                                variant="body2"
                                className={classes.title1}
                              >
                                {observation_value}
                              </Typography>
                            ) : (
                              <a
                                href={latestResult.latest_pdf}
                                className={classes.title1}
                                style={{
                                  textDecoration: "none",
                                }}
                              >
                                See PDF
                              </a>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </AccordionDetails>
                ))}
              </Accordion>
            </div>
          ))}
        </>
      )}
      {pdfOpen && <PdfModal pdfOpen={pdfOpen} setPdfOpen={setPdfOpen} />}
    </>
  );
};

export default ResultsTrends;

const useStyles = makeStyles({
  root: {
    padding: "0px 10px 0px 10px !important",
  },
  title1: {
    color: "#273859 !important",
    fontWeight: "bold !important",
    fontFamily: "Mulish !important",
  },
  accordionContent: {
    border: "1px solid #d9dfeb",
    display: "flex",
    alignItems: "center",
  },
  card: {
    boxShadow: "0px 0px 6px #eeeeee !important",
    marginTop: "10px !important",
    width: "850px ",
  },
  accordionCard: {
    boxShadow: "0px 0px 6px #eeeeee !important",
    marginTop: "5px !important",
    marginBottom: "5px !important",
    width: "850px ",
  },
  border1: {
    borderBottom: "1px dashed #d9dfeb",
    width: "100%",
    margin: "15px 0px",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  typo: {
    fontWeight: "bold !important",
    fontFamily: "Mukta !important",
    color: "#273859 !important",
    fontSize: "18px !important",
    textAlign: "center",
  },
  typo1: {
    fontWeight: "500 !important",
    fontFamily: "Mukta !important",
    color: "#ffffff !important",
    backgroundColor: "#06599ea1 !important",
    borderRadius: "10px !important",
    padding: "5px 0px !important",
    boxShadow: "none !important",
    textTransform: "capitalize",
    width: "100%",
    marginTop: "5px !important",
    cursor: "pointer !important",
  },
  flex1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#06599E ",
    borderRadius: "20px ",
    margin: "5px",
    padding: "5px 13px",
    cursor: "pointer",
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
  seePdf: {
    textDecoration: "none",
    color: "none",
  },
  iconEye: {
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    backgroundColor: "#06599E !important",
    borderRadius: "20px !important",
    marginRight: "5px !important",
    padding: "5px 13px !important",
    cursor: "pointer !important",
  },
});
