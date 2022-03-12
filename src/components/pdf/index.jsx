import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { Button, Card, IconButton, Typography } from "@mui/material";
import { theme } from "config/theme";

import NewPdfViewer from "components/pdf/pdfViewer";
import { apiRequest } from "services";
import { FileDownload, RemoveRedEye } from "@mui/icons-material";
import { downloadPdf } from "pages/latest-records/helper";
import PdfModal from "components/pdf-modal";

const PdfRecord = ({ latestResult, patientId }) => {
  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [setPdfRes] = useState({});
  const [pdfOpen, setPdfOpen] = useState("");
  const { t } = useTranslation();

  const getPdf = async () => {
    const pdfResp = await apiRequest({
      type: "post",
      path: `/v2/doctor/patient/${patientId}/download_pdf`,
      body: {
        lab_id: latestResult?.id,
      },
    });
    if (pdfResp?.status === 200) {
      setPdfRes(pdfResp?.data);
    }
  };

  useEffect(() => {
    if (latestResult?.has_pdf && patientId) {
      getPdf();
    }
    // eslint-disable-next-line
  }, [latestResult, patientId]);

  return (
    <div>
      <Card className={classes.card} style={{ padding: "0px" }}>
        <div
          className={classes.flex2}
          style={{ justifyContent: "space-between" }}
        >
          <Typography variant="h6" className={classes.title}>
            {t("label.latest_lab_report")}
          </Typography>
          <div className={classes.flex}>
            {latestResult?.latest_pdf && (
              <>
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
              </>
            )}
            <Button
              variant="contained"
              className={classes.btn}
              onClick={() => {
                navigate(`${location.pathname}/result-summary`);
              }}
            >
              {t("label.view_history")}
            </Button>
          </div>
        </div>
        <div className={classes.border}></div>
        {!latestResult?.latest_pdf && (
          <Typography
            variant="h6"
            className={classes.title}
            style={{ textAlign: "center", height: "350px" }}
          >
            "No PDF Available"
          </Typography>
        )}
        {latestResult?.latest_pdf && (
          <NewPdfViewer latestResult={latestResult} height="470px" />
        )}
      </Card>
      {pdfOpen && <PdfModal pdfOpen={pdfOpen} setPdfOpen={setPdfOpen} />}
    </div>
  );
};

export default PdfRecord;

const useStyles = makeStyles({
  flex: {
    display: "flex",
    alignItems: "center",
  },
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
    margin: "10px 0px",
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
  title: {
    color: "#273859 !important",
    fontWeight: "bold !important",
    marginLeft: "20px !important",
    fontFamily: "Mulish !important",
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#06599E",
    borderRadius: "20px ",
    marginRight: "5px !important",
    padding: "5px 13px",
    cursor: "pointer",
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
