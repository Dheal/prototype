import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import NewPdfViewer from "components/pdf/pdfViewer";
import { getPatientsDetails } from "pages/latest-records/helper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PdfModal({ pdfOpen, setPdfOpen }) {
  const classes = useStyles();
  const [latestResult, setLatestResult] = useState({});

  const handleClose = () => {
    setPdfOpen("");
  };

  useEffect(() => {
    getPatientsDetails(pdfOpen, setLatestResult);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Dialog
        fullScreen
        open={true}
        onClose={handleClose}
        TransitionComponent={Transition}
        classes={{
          root: classes.root,
        }}
      >
        <AppBar className={classes.dialogBar} sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              className={classes.title}
              sx={{ ml: 2, flex: 1 }}
              variant="body1"
              component="div"
            >
              PDF Print Report View
            </Typography>
          </Toolbar>
        </AppBar>
        {latestResult?.latest_pdf && (
          <NewPdfViewer latestResult={latestResult} height="auto" />
        )}
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    zIndex: "20000 !important",
  },
  title: {
    fontWeight: "600 !important",
    fontSize: "20px !important",
  },
  dialogBar: {
    backgroundColor: "#fff !important",
    color: "#8493ae !important",
  },
});
