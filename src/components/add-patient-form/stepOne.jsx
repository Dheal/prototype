import React, { useEffect } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Typography, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import InputField from "components/input-field";
import SelectField from "components/select-field";
import ResponsiveDatePickers from "components/date-picker";

import { theme } from "config/theme";

const StepOne = ({
  headings,
  data,
  setData,
  setStep,
  countries,
  handleClose,
  next,
  setNext,
  updateId,
  patientDetails,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { birth_date: "" },
  });

  const onSubmit = async (data) => {
    setData((prev) => {
      return { ...prev, ...data };
    });
    setStep(2);
    setNext(true);
  };

  useEffect(() => {
    !next && reset({});
    (updateId || next) && reset({ ...data });
    // eslint-disable-next-line
  }, []);

  watch((data) => {
    data.birth_date === null && setValue({ birth_date: "" });
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body1" color="#273859" className={classes.patient}>
          {headings?.heading}
        </Typography>
        <Typography variant="body1" color="#273859">
          {headings?.subHeading}
        </Typography>
        <Grid className={classes.formGrid} container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <InputField
              cClass={classes.inputField}
              label={t("patient.firstname")}
              required={true}
              type={"text"}
              register={register}
              fieldName={"first_name"}
              error={errors?.first_name}
              errorMessage={errors?.first_name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <InputField
              cClass={classes.inputField}
              label={t("patient.lastname")}
              required={true}
              type={"text"}
              register={register}
              fieldName={"last_name"}
              error={errors?.last_name}
              errorMessage={errors?.last_name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <SelectField
              label={t("patient.gender")}
              fieldName={"gender"}
              required={true}
              control={control}
              error={errors?.gender}
              errorMessage={errors?.gender?.message}
              options={genders}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <SelectField
              label={t("patient.country")}
              fieldName={"country"}
              required={true}
              control={control}
              error={errors?.country}
              errorMessage={errors?.country?.message}
              options={countries?.map((country) => country?.name)}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <SelectField
              label={t("patient.identification_type")}
              fieldName={"ic_type"}
              control={control}
              required={true}
              error={errors?.ic_type}
              errorMessage={errors?.ic_type?.message}
              options={identificationTypes}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <InputField
              cClass={classes.inputField}
              label={t("patient.identification_number")}
              required={true}
              type={"text"}
              register={register}
              fieldName={"ic_number"}
              error={errors?.ic_number}
              errorMessage={errors?.ic_number?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <SelectField
              label={t("patient.ethnicity")}
              fieldName={"ethnic"}
              required={true}
              control={control}
              error={errors?.ethnic}
              errorMessage={errors?.ethnic?.message}
              options={ethnicities}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <ResponsiveDatePickers
              label={t("patient.dob")}
              required={true}
              control={control}
              fieldName={"birth_date"}
              error={errors?.birth_date}
              errorMessage={errors?.birth_date?.message}
            />
          </Grid>
        </Grid>
        <hr className={classes.hr} />
        <Typography variant="body1" color="#273859" className={classes.patient}>
          {t("patient.patient_contact_information")}
        </Typography>

        <Grid className={classes.formGrid} container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <InputField
              cClass={classes.inputField}
              label={t("patient.address")}
              required={true}
              type={"text"}
              register={register}
              fieldName={"address"}
              error={errors?.address}
              errorMessage={errors?.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <InputField
              cClass={classes.inputField}
              label={t("patient.postal_code")}
              required={true}
              type={"text"}
              register={register}
              fieldName={"postal_code"}
              error={errors?.postal_code}
              errorMessage={errors?.postal_code?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <div className={classes.flex}>
              <p className={classes.p}>{t("patient.contact_number")}</p>
            </div>
            <div className={classes.flex12} style={{ position: "relative" }}>
              <div className={classes.flex11}>
                <SelectField
                  fieldName={"contactNumber_code"}
                  error={errors?.contactNumber_code}
                  selectClass={classes.phoneSelect}
                  control={control}
                  backFlex={classes.selectFlex}
                  options={countries?.map((country) => country?.dial_code)}
                  register={register}
                />
                <InputField
                  cClass={classes.inputField}
                  type={"text"}
                  register={register}
                  fieldName={"contactNumber"}
                  error={errors?.contactNumber}
                />
              </div>
              {(errors?.contactNumber_code || errors?.contactNumber) && (
                <p className={classes.error}>
                  {errors?.contactNumber_code?.message ||
                    errors?.contactNumber?.message}
                </p>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <div className={classes.flex}>
              <p
                className={classes.p}
                style={{
                  color:
                    errors?.mobileNumber_code || errors?.mobileNumber
                      ? "#d32f2f"
                      : "",
                }}
              >
                {t("patient.mobile_number")}
              </p>
              <span className={classes.span}>*</span>
            </div>
            <div className={classes.flex12} style={{ position: "relative" }}>
              <div className={classes.flex11}>
                <SelectField
                  fieldName={"mobileNumber_code"}
                  error={errors?.mobileNumber_code}
                  control={control}
                  backFlex={classes.selectFlex}
                  selectClass={classes.phoneSelect}
                  options={countries?.map((country) => country?.dial_code)}
                  register={register}
                />
                <InputField
                  cClass={classes.inputField}
                  type={"text"}
                  register={register}
                  fieldName={"mobileNumber"}
                  error={errors?.mobileNumber}
                />
              </div>
              {(errors?.mobileNumber_code || errors?.mobileNumber) && (
                <p className={classes.error}>
                  {errors?.mobileNumber_code?.message ||
                    errors?.mobileNumber?.message}
                </p>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <InputField
              cClass={classes.inputField}
              label={t("patient.email")}
              required={true}
              type={"text"}
              register={register}
              fieldName={"email_address"}
              error={errors?.email_address}
              errorMessage={errors?.email_address?.message}
            />
          </Grid>
        </Grid>
        <div className={classes.buttonsDiv}>
          <div className={classes.btnContainer}>
            <Button variant="contained" className={classes.btn1} type="submit">
              {t("patient.next")}
            </Button>
          </div>
          <div className={classes.btnContainer}>
            <Button
              variant="contained"
              className={classes.btn}
              onClick={() => {
                handleClose();
                reset({});
              }}
            >
              {t("patient.cancel")}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default StepOne;

const schema = yup
  .object({
    first_name: yup
      .string()
      .required("Please enter first name")
      .min(3, "Must have at least 3 characters")
      .matches(/^[aA-zZ\s]+$/, "Please enter alphabets only"),
    last_name: yup
      .string()
      .required("Please enter last name")
      .min(2, "Must have at least 2 characters")
      .matches(/^[aA-zZ\s]+$/, "Please enter alphabets only"),
    gender: yup.string().required("Please select gender"),
    country: yup.string().required("Please select country"),
    ic_type: yup.string().required("Please select identification type"),
    ic_number: yup
      .string()
      .max(16, "Must be maximum 16 character long")
      .matches(/^[a-z0-9]+$/i, "Alphanumerics characters only")
      .required("Please enter identification number"),
    ethnic: yup.string().required("Please select ethnicity"),
    birth_date: yup
      .string("Please select date of birth")
      .test("DOB", "Please enter a valid date of birth", (value) => {
        return moment().diff(moment(value), "years") >= 0;
      })
      .required("Please select date of birth"),
    address: yup
      .string()
      .required("Please enter address")
      .min(5, "Address must have at least 5 characters")
      .max(350, "Address must have maximum 350 characters"),
    postal_code: yup
      .string()
      .required("Please enter postal code")
      .matches(/^[0-9\s]+$/, "Please enter digits only")
      .max(6, "Must have maximum 6 digits only"),

    contactNumber: yup.string().when("contactNumber_code", {
      is: (val) => {
        if (!val.length) {
          return false;
        }
        return true;
      },
      then: yup
        .string()
        .matches(/^[0-9\s]+$/, "Please enter digits only")
        .test("len", "Please enter 7 to 13 digits only", (val) => {
          return val.length >= 7 && val.length <= 13;
        }),
    }),
    contactNumber_code: yup.string().optional(),
    mobileNumber: yup
      .string()
      .matches(/^[0-9\s]+$/, "Please enter digits only")
      .test("len", "Please enter 7 to 13 digits only", (val) => {
        if (val === undefined) {
          return true;
        }
        return val.length >= 7 && val.length <= 13;
      })
      .required("Please enter 7 to 13 digits only"),
    mobileNumber_code: yup.string().required("Please select calling code"),
    email_address: yup
      .string()
      .email("Please enter email")
      .required("Please enter email"),
  })
  .required();

const useStyles = makeStyles({
  selectFlex: {
    marginBottom: "0px",
  },
  formGrid: {
    marginTop: "0px !important",
  },
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
    position: "absolute",
    right: "5px",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2px",
    position: "relative",
  },
  p: {
    height: "22.5px",
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#8493ae",
    margin: "0",
  },
  buttonsDiv: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row-reverse",
    marginTop: "0px !important",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      marginTop: "20px",
    },
  },
  btnContainer: {
    margin: "15px",
    [theme.breakpoints.down("sm")]: {
      margin: "12px 5px ",
    },
  },
  btn1: {
    height: "42px !important",
    borderRadius: " 44px !important",
    backgroundColor: "#06599E !important",
    textDecoration: " none",
    textTransform: "initial !important",
    textOutline: " none",
    fontFamily: "Mulish !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    color: " #fff",
    boxShadow: "none !important",
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
    height: "42px !important",
    borderRadius: " 44px !important",
    backgroundColor: "#8493ae !important",
    textDecoration: " none",
    textTransform: "initial !important",
    boxShadow: "none !important",
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
    position: "absolute",
    bottom: "-22px",
    marginRight: "14px",
    marginBottom: 0,
  },
});

const genders = ["Male", "Female", "Others"];
const identificationTypes = [
  "NRIC/FIN",
  "Driver’s License",
  "Passport Number",
  "Others",
];
const ethnicities = [
  "Chinese",
  "Malay",
  "Indian",
  "Eurasian",
  "European",
  "Thai",
  "Indonesian",
  "Others",
];
