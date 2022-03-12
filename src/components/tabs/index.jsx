import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDashActiveTab } from "store";

const Tabs = ({
  tabs,
  isDash = false,
  tabActive,
  setTabActive,
  tabsCount,
  setPage,
  tabsC,
  tabsContainer1,
  btn2,
  tabClass,
  activeTabClass,
  link1,
  noUrlLocation,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const SearchParams = useSearchParams();

  const { dashActiveTab } = useSelector((state) => state.app);

  const handleChange = (value) => {
    if (isDash) {
      dispatch(setDashActiveTab(value));
    }
    if (!isDash) {
      setTabActive(value);
    }
  };

  useEffect(() => {
    if (isDash) {
      tabs.forEach((tab) => {
        if (location.pathname.includes(tab.key)) {
          dispatch(setDashActiveTab(tab.value));
        }
        if (!location.pathname.includes(tab.key)) {
          dispatch(setDashActiveTab("/dashboard/for-review/"));
        }
      });
    }
    if (!noUrlLocation) {
      if (!isDash) {
        setTabActive(location.pathname);
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`${classes.tabsContainer} ${tabsC}`}>
      <div className={`${classes.tabs} ${tabsContainer1} ${classes.flex}`}>
        {tabs?.map(({ value, label, key, disabled }, index) => (
          <div
            className={`${classes.link} ${link1}`}
            key={index}
            onClick={() => {
              if (disabled !== true) {
                handleChange(value);
                navigate(value);
                setPage(1);
                SearchParams({
                  page: 1,
                });
              }
            }}
          >
            <IconButton className={`${classes.btn} ${btn2}`}>
              <span
                className={`${classes.tab} ${tabClass} ${
                  isDash
                    ? dashActiveTab.includes(key) &&
                      `${classes.tabActive} ${activeTabClass}`
                    : tabActive === value &&
                      `${classes.tabActive} ${activeTabClass}`
                }`}
              >
                {`${label} ${
                  dashboardTabs.includes(key)
                    ? `${
                        key === "review"
                          ? `(${tabsCount?.forReview})`
                          : `(${tabsCount?.allPatients})`
                      }`
                    : ""
                }`}
              </span>
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    borderBottom: "1px solid rgb(56 73 107 / 36%)",
  },
  tabsContainer: {
    width: "100%",
  },
  tab: {
    fontFamily: "Poppins !important",
    fontWeight: "700 !important",
    fontSize: "14px !important",
    color: "#8493AE !important",
    paddingBottom: "10px !important",
  },
  tabActive: {
    color: "#06599E !important",
    borderBottom: "2px solid #06599E !important",
  },
  btn: {
    borderRadius: "0 !important",
    padding: "0px 10px !important",
  },
  flex: {
    display: "flex",
  },
});

const dashboardTabs = ["review", "patient"];
