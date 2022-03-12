import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ErrorIcon from "@mui/icons-material/Error";
import { useTranslation } from "react-i18next";
import Loader from "components/laoder";

export default function BasicTable({
  rows,
  loading,
  columns,
  sortParam,
  className,
  setSortParam,
  handleView,
  actionsBtn,
  handleReceived,
  headerCenter,
  handleRowClick,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(({ key, title, align, sort }, index) => (
              <TableCell className={classes.heading} align={align} key={index}>
                <div className={`${classes.headerContent} ${headerCenter}`}>
                  {title || t("table.title." + key)}
                  {sort && (
                    <IconButton
                      onClick={() => {
                        setSortParam(
                          `${key} ${
                            sortParam.includes("ASC")
                              ? "DESC"
                              : sortParam.includes("DESC")
                              ? "ASC"
                              : "ASC"
                          }`
                        );
                      }}
                    >
                      <KeyboardArrowDownIcon
                        style={{
                          transform:
                            sortParam.includes(key) &&
                            sortParam.includes("DESC")
                              ? "rotate(-180deg)"
                              : "",
                          transition: "all 0.3s ease-in-out",
                        }}
                        className={classes.arrow}
                      />
                    </IconButton>
                  )}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {!loading && rows?.length !== 0 && (
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                className={className}
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  handleRowClick(row?.id);
                }}
              >
                {columns?.map(({ key, align }, index) => (
                  <TableCell
                    key={index}
                    className={`${classes.regular} ${
                      key === "patient_name" && classes.nameColumn
                    } ${key === "status" && classes.status}
                  `}
                    align={align}
                  >
                    {key === "actions" ? (
                      <Link
                        className={classes.link}
                        to={`/patient/${row.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className={`${classes.actions} ${actionsBtn}`}>
                          <span className={classes.markRead}>{row[key]}</span>
                        </div>
                      </Link>
                    ) : key === "pdf" ? (
                      <>
                        {row[key] === true && (
                          <img
                            src="https://dev-iq.biomarking.com/images/pdf-icon.svg"
                            alt="pdf-view"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleView(row?.id);
                            }}
                          />
                        )}
                      </>
                    ) : key === "date_of_test" || key === "updated_at" ? (
                      row[key] !== "-" ? (
                        new Date(row[key]).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      ) : (
                        row[key]
                      )
                    ) : key === "actionsBtns" ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          {row[key]?.view && (
                            <Button
                              variant="contained"
                              className={classes.btn}
                              onClick={() => {
                                handleView(row[key]?.view);
                              }}
                            >
                              View Details
                            </Button>
                          )}
                          {row[key]?.order && (
                            <Button
                              variant="contained"
                              className={classes.btn1}
                              onClick={() => {
                                handleReceived(row[key]?.order);
                              }}
                            >
                              Order Received
                            </Button>
                          )}
                        </div>
                      </>
                    ) : key === "test_status" ? (
                      <div className={classes.testFlex}>
                        <span style={{ marginRight: "5px" }}>
                          {row?.test_status_pre}
                        </span>
                        <span
                          style={{
                            color:
                              row?.test_status_post === "Complete" ||
                              row?.test_status_post === "Results Reportd"
                                ? "#42b942"
                                : "#cd1460",
                          }}
                        >
                          {row?.test_status_post}
                        </span>
                      </div>
                    ) : (
                      row[key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      {!loading && rows.length === 0 && (
        <div className={classes.noData}>
          <Typography className={classes.noDataText} variant="body1">
            {t("label.no_data")}
          </Typography>
        </div>
      )}
      {loading && (
        <div className={classes.noData}>
          <Loader loading={loading} />
        </div>
      )}
    </TableContainer>
  );
}

const useStyles = makeStyles({
  btn: {
    boxShadow: "none !important",
    backgroundColor: "#06599E !important",
    textTransform: "capitalize !important",
    fontFamily: "Mukta !important",
    width: "150px",
  },
  btn1: {
    boxShadow: "none !important",
    backgroundImage: "linear-gradient(to right,#00a79d,#2bb673)",
    textTransform: "capitalize !important",
    marginTop: "5px !important",
    width: "150px",
    fontFamily: "Mukta !important",
  },
  heading: {
    fontSize: "12px !important",
    fontFamily: "Mulish !important",
    fontWeight: "600 !important",
    lineHeight: "18px !important",
    color: "#06599E !important",
  },
  arrow: {
    color: "#06599E !important",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
  },
  regular: {
    fontFamily: "Mulish !important",
    fontWidth: "400 !important",
    fontSize: "14px !important",
    lineHeight: "17.5px !important",
    color: "#111111 !important",
  },
  nameColumn: {
    fontWeight: "700 !important",
  },
  status: {
    color: "#273859 !important",
  },
  markRead: {
    display: "flex",
    justifyContent: "center !important",
    alignItems: "center !important",
    border: "2px solid #8493AE",
    whiteSpace: "nowrap",
    borderRadius: "5px",
    fontFamily: "Mulish !important",
    fontWidth: "700 !important",
    fontSize: "12px !important",
    lineHeight: "14px !important",
    color: "#8493AE !important",
    width: "125px !important",
    height: "30px !important",
    cursor: "pointer",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  noData: {
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    width: "100% !important",
  },
  noDataText: {
    width: "100%",
    textAlign: "center",
    padding: "12px !important",
    fontSize: "14px !important",
    color: "#273859 !important",
    fontWeight: 700,
    verticalAlign: "middle !important",
  },
  link: {
    textDecoration: "none",
  },
  testFlex: {
    display: "flex",
  },
});
