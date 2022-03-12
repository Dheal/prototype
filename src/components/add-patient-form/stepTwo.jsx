import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Typography, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTranslation } from "react-i18next";
import InputField from "components/input-field";
import SelectField from "components/select-field";
import ResponsiveDatePickers from "components/date-picker";

import { apiRequest } from "services";
import { getAge } from "./helper";
import { removeKey } from "helper";
import { theme } from "config/theme";

const StepTwo = ({
  headings,
  data,
  setData,
  setStep,
  handleClose,
  setSuccess,
  countries,
  next,
  setNext,
  updateId,
}) => {
  const classes = useStyles();
  const [payor, setPayor] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { policy_expiry_date: "" },
  });
  const { t } = useTranslation();
  const onSubmit = async (formData) => {
    let temp = {
      ...data,
      ...formData,
      ...(data?.contactNumber_code &&
        data?.contactNumber && {
          contact: `${data.contactNumber_code} ${data.contactNumber}`,
        }),
      mobile: `${data.mobileNumber_code} ${data.mobileNumber}`,
      gender_id: genders.find((x) => x.gender === data?.gender)?.gender_id,
      age: getAge(data?.birth_date),
      birth_date: data.birth_date,
      country_id: countries?.find((x) => x.name === data?.country)?.dial_code,
    };

    temp = removeKey(temp);
    if (!updateId) {
      const res = await apiRequest({
        type: "post",
        path: "/v2/doctor/patient/create_patient",
        body: {
          profile: temp,
        },
      });
      if (res?.status === 200) {
        setSuccess(true);
        setNext(false);
        handleClose();
      }
    }
    if (updateId) {
      const res = await apiRequest({
        type: "post",
        path: `/v2/doctor/patient/${updateId}/update_patient`,
        body: {
          profile: temp,
        },
      });
      if (res?.status === 200) {
        setSuccess(true);
        setNext(false);
        handleClose();
      }
    }
  };

  watch((data) => {
    setData((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
    setPayor(data?.payor);
  });
  useEffect(() => {
    !next && reset({});
    (updateId || next) && reset({ ...data });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={classes.back1}
          onClick={() => {
            setStep(1);
          }}
        >
          <ArrowBackIosIcon style={{ fontSize: "16px" }} /> Back
        </div>
        <Typography variant="body1" color="#273859" className={classes.patient}>
          {headings?.supporting}
        </Typography>
        {headings?.supportingSubHeading && (
          <Typography variant="body1" color="#273859">
            {headings?.supportingSubHeading}
          </Typography>
        )}
        <Grid className={classes.formGrid} container spacing={4}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <SelectField
              label={t("patient.marital_status")}
              fieldName={"marital_status"}
              required={true}
              control={control}
              error={errors?.marital_status}
              errorMessage={errors?.marital_status?.message}
              options={maritalStatuses}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <InputField
              cClass={classes.inputField}
              label={t("patient.occupation")}
              type={"text"}
              register={register}
              fieldName={"occupation"}
              error={errors?.occupation}
              errorMessage={errors?.occupation?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <SelectField
              label={t("patient.language")}
              fieldName={"language"}
              required={true}
              control={control}
              error={errors?.language}
              errorMessage={errors?.language?.message}
              options={languages}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <SelectField
              label={t("patient.religion")}
              fieldName={"religion"}
              error={errors?.religion}
              errorMessage={errors?.religion?.message}
              control={control}
              options={religions}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <InputField
              cClass={classes.inputField}
              label={t("patient.next_of_kin_name")}
              type={"text"}
              register={register}
              fieldName={"nok"}
              error={errors?.nok}
              errorMessage={errors?.nok?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <SelectField
              label={t("patient.next_of_kin_relationship")}
              fieldName={"nok_relationship"}
              control={control}
              error={errors?.nok_relationship}
              errorMessage={errors?.nok_relationship?.message}
              options={nextOfKins}
              register={register}
            />
          </Grid>
        </Grid>
        <hr className={classes.hr} />
        <Typography variant="body1" color="#273859" className={classes.patient}>
          {t("patient.patient_payment_information")}
        </Typography>

        <Grid className={classes.formGrid} container spacing={4}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <SelectField
              label={t("patient.payor")}
              fieldName={"payor"}
              required={true}
              control={control}
              error={errors?.payor}
              errorMessage={errors?.payor?.message}
              options={payors}
              register={register}
            />
          </Grid>
          {payor === "Insurer" && (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
              <SelectField
                label={t("patient.select_insurer")}
                fieldName={"insurer"}
                required={true}
                control={control}
                error={errors?.insurer}
                errorMessage={errors?.insurer?.message}
                options={insurers}
                register={register}
              />
            </Grid>
          )}
          {payor === "Others" && (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
              <InputField
                cClass={classes.inputField}
                label={t("patient.payor_name")}
                required={true}
                type={"text"}
                register={register}
                fieldName={"payor_name"}
                error={errors?.payor_name}
                errorMessage={errors?.payor_name?.message}
              />
            </Grid>
          )}
          {(payor === "Insurer" || payor === "Others") && (
            <>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                <InputField
                  cClass={classes.inputField}
                  label={t("patient.policy_number")}
                  required={true}
                  type={"text"}
                  register={register}
                  fieldName={"policy_no"}
                  error={errors?.policy_no}
                  errorMessage={errors?.policy_no?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                <ResponsiveDatePickers
                  label={t("patient.expiry_date")}
                  required={true}
                  control={control}
                  fieldName={"policy_expiry_date"}
                  error={errors?.policy_expiry_date}
                  errorMessage={errors?.policy_expiry_date?.message}
                  future={false}
                />
              </Grid>
            </>
          )}
        </Grid>
        <div className={classes.buttonsDiv}>
          <div
            className={classes.back}
            onClick={() => {
              setStep(1);
            }}
          >
            <ArrowBackIosIcon style={{ fontSize: "16px" }} />{" "}
            {t("patient.back")}
          </div>
          <div className={classes.btnsContainer}>
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                className={classes.btn}
                type="submit"
                onClick={() => {
                  handleClose();
                }}
              >
                {t("patient.cancel")}
              </Button>
            </div>
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                className={classes.btn1}
                type="submit"
              >
                {updateId ? t("patient.save") : t("patient.add")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default StepTwo;

const schema = yup
  .object({
    marital_status: yup.string().required("Please select marital status"),
    occupation: yup.string().when({
      is: (val) => {
        if (!val.length) {
          return false;
        }
        return true;
      },
      then: yup
        .string()
        .matches(/^[aA-zZ\s]+$/, "Please enter alphabets only")
        .max(30, "maximum 30 length"),
    }),
    language: yup.string().required("Please select language"),
    religion: yup.string().optional(),
    nok: yup.string().when({
      is: (val) => {
        if (!val.length) {
          return false;
        }
        return true;
      },
      then: yup
        .string()
        .matches(/^[aA-zZ\s]+$/, "Please enter alphabets only")
        .max(30, "maximum 30 length"),
    }),
    nok_relationship: yup.string().optional(),
    payor: yup.string().required("Please select payor"),
    insurer: yup.string().when("payor", {
      is: "Insurer",
      then: yup.string().required("Please select insurer"),
    }),
    payor_name: yup.string().when("payor", {
      is: "Others",
      then: yup
        .string()
        .required("Please enter payor name")
        .matches(/^[aA-zZ\s]+$/, "Please enter alphabets only")
        .max(30, "Payor Name must have maximum 30 alphabets"),
    }),

    policy_no: yup.string().when("payor", {
      is: (value) => {
        return value === "Insurer" || value === "Others";
      },
      then: yup
        .string()
        .max(26, "Policy Number must have maximum 26 characters")
        .required("Please enter policy number"),
    }),
    policy_expiry_date: yup.string().when("payor", {
      is: (value) => {
        return value === "Insurer" || value === "Others";
      },
      then: yup.string().required("Please enter expiry date"),
    }),
  })
  .required();

const useStyles = makeStyles({
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "50px",
    paddingBottom: "0px",
  },
  process: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  processText: {
    fontSize: "13px !important",
  },
  input: {
    marginBottom: "16px",
  },
  inputField: {
    width: "100%",
  },
  patient: {
    fontFamily: "Mulish !important",
    fontStyle: "normal !important",
    fontWeight: "700 !important",
    fontSize: "23px !important",
    lineHeight: "42px !important",
    color: "#273859 !important",
  },
  profileText: {
    fontFamily: "Mulish !important",
    fontStyle: "normal  !important",
    fontWeight: "400 !important",
    fontSize: "15px !important",
    lineHeight: "19px !important",
    color: "#273859 !important",
    marginBottom: "13px !important",
  },
  hr: {
    marginTop: "40px",
    border: 0,
    clear: "both",
    display: "block",
    width: " 100%",
    backgroundColor: "#d9dfeb",
    height: "1px",
    marginBottom: "13px",
  },
  span: {
    color: "red",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  p: {
    height: "22.5px",
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "13px",
    lineHeight: "22px",
    color: "#8493ae",
    margin: "0",
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px !important",
  },
  btnsContainer: {
    display: "flex",
  },
  btnContainer: {
    margin: "15px",
    [theme.breakpoints.down("sm")]: {
      margin: "12px 5px ",
    },
  },
  btn1: {
    height: "48px !important",
    borderRadius: " 44px !important",
    backgroundColor: "#06599E !important",
    textDecoration: " none",
    textTransform: "initial !important",
    textOutline: " none",
    fontFamily: "Mulish !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    color: " #fff",
    width: " 150px",
    fontSize: "16px !important",
    [theme.breakpoints.down("sm")]: {
      width: "100px",
    },
    "&:disabled": {
      color: "#fff !important",
      backgroundColor: "#06599E !important",
      boxShadow: "0 10px 40px 0 #001fff61 !important",
      borderColor: "#dc3545 !important",
      opacity: "0.65",
    },
  },
  btn: {
    height: "48px !important",
    borderRadius: " 44px !important",
    backgroundColor: "#8493ae !important",
    textDecoration: " none",
    textTransform: "initial !important",
    textOutline: " none",
    fontFamily: "Mulish !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "16px !important",
    color: " #fff",
    width: " 150px",
    [theme.breakpoints.down("sm")]: {
      width: "100px",
    },
    "&:disabled": {
      color: "#fff !important",
      backgroundColor: "#8493ae !important",
      boxShadow: "0 10px 40px 0 #001fff61 !important",
      borderColor: "#dc3545 !important",
      opacity: "0.65",
    },
  },
  phoneSelect: {
    width: "100px",
  },
  flex11: {
    display: "flex",
  },
  flex12: {
    display: "flex",
    flexDirection: "column",
  },
  error: {
    color: "#d32f2f",
    fontFamily: `Roboto,Helvetica,Arial,sans-serif`,
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
    textAlign: "left",
    marginTop: "3px",
    marginRight: "14px",
    marginBottom: 0,
  },
  back: {
    display: "flex",
    color: "#06599e",
    cursor: "pointer",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  back1: {
    display: "none",
    color: "#06599e",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  formGrid: {
    marginTop: "0px !important",
  },
});

const payors = ["Self Pay", "Insurer", "Others"];
const languages = ["English", "Chinese", "Malay", "Tamil", "Others"];
const nextOfKins = ["Parent", "Spouse", "Child", "Partner", "Friend", "Others"];
const maritalStatuses = [
  "Single",
  "Married",
  "Widowed",
  "Separated",
  "Divorced",
];
const religions = [
  "Buddhism",
  "Christianity",
  "Islam",
  "Hinduism",
  "Sikhism",
  "Others",
];
const insurers = [
  "Great Eastern",
  "Prudential",
  "AIA",
  "NTUC Income",
  "QBE",
  "Aviva",
  "AXA",
  "Others",
];

const genders = [
  { gender_id: 1, gender: "Male" },
  { gender_id: 2, gender: "Female" },
  { gender_id: 3, gender: "Others" },
];
