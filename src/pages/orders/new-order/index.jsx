import React from "react";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

import PatientSelection from "./patient-selection";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import TestSelection from "./test-selection";

const NewOrder = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", marginTop: "20px" }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className={classes.tabs}
          >
            <Tab
              label="Patient Selection"
              style={{ zIndex: 2000 }}
              classes={{
                selected: classes.selected,
                root: classes.root,
              }}
              {...a11yProps(0)}
            />
            <Tab
              label="Test Selection"
              {...a11yProps(1)}
              style={{ left: "-20px", zIndex: 1500 }}
              classes={{
                selected: classes.selected,
                root: classes.root,
              }}
            />
            <Tab
              label="  Sample Selection"
              {...a11yProps(2)}
              style={{ left: "-40px", zIndex: 1300 }}
              classes={{
                selected: classes.selected,
                root: classes.root,
              }}
            />
            <Tab
              label="   Order Confirmation"
              {...a11yProps(3)}
              style={{ left: "-60px" }}
              classes={{
                selected: classes.selected,
                root: classes.root,
              }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <PatientSelection />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TestSelection />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Sample Selection
        </TabPanel>
        <TabPanel value={value} index={3}>
          Order Confirmation
        </TabPanel>
      </Box>
    </>
  );
};

export default NewOrder;

const useStyles = makeStyles({
  tabs: {
    borderBottom: "none !important",
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
    "& .MuiTabs-flexContainer": {
      width: "750px !important",
    },
    "& .MuiTabs-scroller": {
      maxWidth: "750px !important",
      overflowX: "auto !important",
    },
  },
  root: {
    textTransform: "none !important",
    color: " #8493AE !important",
    fontSize: "16px !important",
    fontFamily: "Mukta !important",
    position: "relative !important",
    backgroundColor: " #CAD3E6 !important",
    fontWeight: "bold !important",
    boxShadow: "0px 10px -14px 14px #FFFFFF !important",
    width: "200px",
    borderBottom: "none !important",
    clipPath: "polygon(89% 0, 100% 50%, 89% 100%, 0% 100%, 0 53%, 0% 0%)",
  },
  selected: {
    color: "#ffffff !important",
    textTransform: "none !important",
    fontSize: "16px !important",
    fontFamily: "Mukta !important",
    boxShadow: "0px 10px -14px 14px #FFFFFF !important",
    backgroundColor: "#06599E !important",
    position: "relative !important",
    width: "200px",
    fontWeight: "bold !important",
    borderBottom: "none !important",
  },
  textColorSecondary: {
    color: "#8493AE !important",
    textTransform: "none !important",
    fontSize: "16px !important",
    fontFamily: "Mukta !important",
    fontWeight: "bold !important",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
