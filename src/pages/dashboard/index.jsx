import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Card, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Table from "components/table";
import Paginations from "components/pagination";
import PdfModal from "components/pdf-modal";
import SearchAddPatient from "./search-add-patient";

import { setCurrentUser } from "store";
import { getPatientsData, getRecordsCount, getUser } from "./helper";

const Dashboard = () => {
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const { token } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [firstUse, setFirstUse] = useState(true);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState({});
  const [patientId, setPatientId] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [sortParam, setSortParam] = useState("");
  const [tableLoader, setTableLoader] = useState(true);
  const [tabsCount, setTabsCount] = useState({
    forReview: 0,
    allPatients: 0,
  });
  const queryPage = searchParams.get("page");
  const queryKeywords = searchParams.get("keywords");
  const queryChildUserId = searchParams.get("child_user_id");

  useEffect(() => {
    if (firstUse) {
      let params = {};
      if (queryPage !== null && queryPage !== undefined && queryPage !== 1) {
        params.queryPage = queryPage;
        setPage(queryPage);
      }
      if (
        queryKeywords !== null &&
        queryKeywords !== undefined &&
        queryKeywords !== ""
      ) {
        params.queryKeywords = queryKeywords;
      }
      if (
        queryChildUserId !== null &&
        queryChildUserId !== undefined &&
        queryChildUserId !== ""
      ) {
        params.queryChildUserId = queryChildUserId;
      }
      setSearchData({
        ...(params.queryKeywords && { dashSearch: params.queryKeywords }),
        ...(params.queryChildUserId && {
          searchSelect: params.queryChildUserId,
        }),
      });

      getUser(dispatch, setCurrentUser, token);

      getRecordsCount(
        {
          keywords: params.queryKeywords,
          child_user_id: params.queryChildUserId,
        },
        setTabsCount,
        setTableLoader
      );
      getPatientsData(
        setTableLoader,
        setCount,
        setData,
        page,
        location.pathname.includes("all") ? 2 : 0,
        params.queryKeywords,
        params.queryChildUserId
      );
      setFirstUse(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!firstUse) {
      getRecordsCount(
        {
          keywords: searchData.dashSearch,
          child_user_id: searchData.searchSelect,
        },
        setTabsCount,
        setTableLoader
      );
      getPatientsData(
        setTableLoader,
        setCount,
        setData,
        page,
        location.pathname.includes("all") ? 2 : 0,
        searchData.dashSearch,
        searchData.searchSelect,
        sortParam
      );
    }
    // eslint-disable-next-line
  }, [
    location.pathname,
    page,
    queryPage,
    searchData.dashSearch,
    searchData.searchSelect,
    sortParam,
  ]);

  return (
    <>
      <div className={classes.container}>
        <Container maxWidth="lg">
          <SearchAddPatient
            setData={setData}
            setCount={setCount}
            page={+page}
            setPage={setPage}
            tabsCount={tabsCount}
            setTabsCount={setTabsCount}
            searchData={searchData}
            setSearchData={setSearchData}
          />
          <Card className={classes.card}>
            <Table
              columns={columns}
              rows={data}
              headerCenter={classes.header}
              className={classes.cursor}
              sortParam={sortParam}
              actionsBtn={classes.actionsBtn}
              setSortParam={setSortParam}
              loading={tableLoader}
              handleView={(id) => {
                setPatientId(id);
              }}
              handleRowClick={(id) => {
                navigate(`/patient/${id}`);
              }}
            />
            {!tableLoader && data.length !== 0 && (
              <div className={classes.paginationContainer}>
                <Paginations count={count} page={+page} setPage={setPage} />
              </div>
            )}
          </Card>
          {patientId && (
            <PdfModal pdfOpen={patientId} setPdfOpen={setPatientId} />
          )}
        </Container>
      </div>
    </>
  );
};

export default Dashboard;

const useStyles = makeStyles({
  card: {
    boxShadow: "0px 0px 6px #eeeeee !important",
    marginTop: "20px !important",
    padding: "15px 0px",
  },
  actionsBtn: {
    justifyContent: "flex-start",
  },
  header: {
    justifyContent: "flex-start",
  },
  container: {
    position: "relative",
    height: "calc(100vh - 70px)",
    backgroundSize: "cover",
    width: "100%",
    paddingTop: "32px",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0",
  },
  cursor: {
    cursor: "pointer",
  },
});

const columns = [
  { key: "ic_number", title: "IC NO.", sort: true, align: "left" },
  { key: "patient_name", title: "PATIENT NAME", sort: true, align: "left" },
  { key: "date_of_test", title: "REQUEST DATE", align: "center" },
  { key: "updated_at", title: "UPDATED AT", align: "center" },
  { key: "status", title: "STATUS", align: "center" },
  { key: "actions", title: "ACTIONS", align: "center" },
  { key: "pdf", title: "", align: "center" },
];
