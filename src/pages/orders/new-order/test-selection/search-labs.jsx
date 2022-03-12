import React from "react";

import { makeStyles } from "@mui/styles";
import { Card, Grid, Typography } from "@mui/material";
import { theme } from "config/theme";
import SearchIcon from "@mui/icons-material/Search";

import { useForm } from "react-hook-form";

import SelectField from "components/select-field";
import InputField from "components/input-field";

import green from "assets/green.svg";
import icon from "assets/Icon.svg";
import plus from "assets/plus.svg";

const SearchLabs = () => {
  const classes = useStyles();
  const { register, control } = useForm();

  return (
    <>
      <Card className={classes.card}>
        <div
          className={classes.flex}
          style={{
            justifyContent: "space-between",
            borderBottom: "1px solid #D9DFEB",
            paddingBottom: "10px",
          }}
        >
          <div className={classes.flex1}>
            <Typography variant="body1" className={classes.typo}>
              Select Lab
            </Typography>
            <img src={green} alt="" style={{ marginLeft: "10px" }} />
          </div>
          <div className={classes.width}>
            <SelectField
              fieldName={"mobileNumber_code"}
              control={control}
              options={options}
              register={register}
            />
          </div>
        </div>
        <div
          className={classes.flex}
          style={{
            justifyContent: "space-between",

            paddingBottom: "10px",
          }}
        >
          <div className={classes.flex}>
            <Typography variant="body1" className={classes.typo}>
              Search Tests
            </Typography>
          </div>
          <div className={classes.inputField}>
            <InputField
              type={"text"}
              register={register}
              placeholder="Connie Smith"
              fieldName={"firstName"}
            />
            <SearchIcon className={classes.icon} />
          </div>
        </div>

        <div
          className={classes.flex}
          style={{
            justifyContent: "space-between",
            borderBottom: "1px solid #D9DFEB",
            paddingBottom: "10px",
          }}
        >
          <div className={classes.selectWidth}>
            <SelectField
              fieldName={"mobileNumber_code"}
              control={control}
              options={options}
              register={register}
            />
          </div>
          <div className={classes.selectWidth}>
            <SelectField
              fieldName={"mobileNumber_code"}
              control={control}
              options={options}
              register={register}
              placeholder="Filter by Speciality"
            />
          </div>
        </div>

        <div className={classes.table}>
          <Grid
            container
            spacing={3}
            style={{
              borderBottom: "1px solid #D9D9D9",
              padding: "10px 0px",
            }}
          >
            <Grid item xs={2}>
              <Typography variant="body2" className={classes.title1}>
                Code
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2" className={classes.title1}>
                Name
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            style={{
              padding: "10px 0px",
            }}
          >
            {tableData.map((ele, index) => (
              <>
                <Grid item xs={2}>
                  <Typography variant="body2" className={classes.title1}>
                    {ele.code}
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body2" className={classes.title}>
                    {ele.name}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img src={icon} alt="" />
                  <img src={plus} alt="" style={{ marginLeft: "10px" }} />
                </Grid>
              </>
            ))}
          </Grid>
        </div>
      </Card>
    </>
  );
};

export default SearchLabs;

const tableData = [
  {
    code: "  xm50",
    name: "      COVID-19 RT-PCR (Urgent)",
  },
  {
    code: "  xm50",
    name: "      COVID-19 RT-PCR (Urgent)",
  },
  {
    code: "  xm50",
    name: "      COVID-19 RT-PCR (Urgent)",
  },
  {
    code: "  xm50",
    name: "      COVID-19 RT-PCR (Urgent)",
  },
  {
    code: "  xm50",
    name: "      COVID-19 RT-PCR (Urgent)",
  },
];

const options = ["Gribles Pathology", "Innoquest Diagnostics"];

const useStyles = makeStyles({
  table: {},
  title1: {
    color: "#273859 !important",
    fontWeight: "bold !important",
    fontFamily: "Mulish !important",
  },
  title: {
    color: "#273859 !important",
    fontFamily: "Mulish !important",
  },

  selectWidth: {
    width: "45%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  width: {
    width: "75%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  inputField: {
    position: "relative",
    width: "75%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  card: {
    boxShadow: "0px 0px 6px #eeeeee !important",
    marginTop: "20px !important",
    padding: "32px 20px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 10px",
    },
  },
  typo: {
    fontWeight: "bold !important",
    fontSize: "18px !important",
    color: "#2A3752 !important",
    fontFamily: "Mukta !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px !important",
      marginTop: "5px !important",
    },
  },
  flex: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  flex1: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: "5px",
    top: "16px",
    cursor: "pointer",
    color: "#DADADA",
  },
});
