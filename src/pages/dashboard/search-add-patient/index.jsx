import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";

import SelectField from "components/select-field";
import InputField from "components/input-field";
import TabsAddPatients from "./tabs-add-patient";
import LatestRecords from "../../latest-records";
import { useTranslation } from "react-i18next";

const SearchAddPatient = ({
  setData,
  setCount,
  page,
  setPage,
  tabsCount,
  setTabsCount,
  searchData,
  setSearchData,
}) => {
  const classes = useStyles();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useSelector((state) => state.app);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [next, setNext] = useState(false);
  const [clinics, setClinics] = useState([]);
  const { register, handleSubmit, control, reset } = useForm();
  const { t } = useTranslation();

  const onSubmit = async (data) => {
    const clinicId = clinics.find((x) => x.name === data.searchSelect)?.id;
    setSearchData({ dashSearch: data.dashSearch, searchSelect: clinicId });

    setSearchParams({
      page,
      keywords: data.dashSearch,
      child_user_id: clinicId,
    });
  };

  useEffect(() => {
    let childUsers = currentUser?.personal?.profile?.child_users;
    childUsers = [{ name: "Current User" }].concat(childUsers);
    setClinics(childUsers);

    reset({
      ...(searchData.dashSearch && { dashSearch: searchData.dashSearch }),
      ...(searchData.searchSelect && {
        searchSelect: childUsers.find((x) => x?.id === +searchData.searchSelect)
          ?.name,
      }),
    });
    // eslint-disable-next-line
  }, [currentUser, searchData.dashSearch, searchData.searchSelect]);

  return (
    <>
      <form
        className={classes.searchContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5}>
            <InputField
              cClass={classes.inputField}
              type={"text"}
              inputInput={classes.inputInput}
              register={register}
              placeholder={t("label.search_patient_name")}
              fieldName={"dashSearch"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <SelectField
              fieldName={"searchSelect"}
              control={control}
              options={clinics?.map((clinic) => {
                return clinic?.name;
              })}
              register={register}
              defaultValue={"Current User"}
              placeHolder={false}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <Button
              variant="contained"
              className={classes.search}
              type="submit"
            >
              {t("label.search")}
            </Button>
          </Grid>
        </Grid>
        <TabsAddPatients
          setPage={setPage}
          setOpen={setOpen}
          open={open}
          success={success}
          setSuccess={setSuccess}
          next={next}
          setNext={setNext}
          tabsCount={tabsCount}
          searchData={searchData}
        />
      </form>
    </>
  );
};

export default SearchAddPatient;

const useStyles = makeStyles({
  inputInput: {
    marginTop: "0px !important",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 130px)",
    width: "100%",
  },
  search: {
    width: "100% !important",
    height: "40px !important",
    borderRadius: "2px !important",
    backgroundColor: "#06599E !important",
    fontFamily: "Poppins !important",
    marginTop: "8px !important",
    fontSize: "14px !important",
    fontWeight: "600 !important",
    boxShadow: "none !important",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});
