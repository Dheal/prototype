import React from "react";
import { makeStyles } from "@mui/styles";
import { FormHelperText, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SelectField = ({
  label,
  required,
  error,
  errorMessage,
  options,
  control,
  register,
  fieldName,
  backFlex,
  selectClass,
  defaultValue = "",
  placeHolder = true,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <div className={classes.flex1}>
        <div className={`${classes.flex} ${backFlex}`}>
          <p className={classes.p} style={{ color: error ? "#d32f2f" : "" }}>
            {label}
          </p>
          {required && <span className={classes.span}>*</span>}
        </div>
        <Controller
          control={control}
          name={fieldName}
          defaultValue={defaultValue}
          render={({ field: { ref, name, value, onChange } }) => (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={`${selectClass} ${classes.root}`}
              error={error}
              inputRef={ref}
              name={name}
              value={value}
              onChange={onChange}
              classes={{
                outlined: classes.outlined,
              }}
              displayEmpty
            >
              {placeHolder && (
                <MenuItem value="" className={classes.placeHolder}>
                  <em>{t("label.select")}</em>
                </MenuItem>
              )}
              {options?.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {error && (
          <FormHelperText className={classes.error}>
            {errorMessage}
          </FormHelperText>
        )}
      </div>
    </>
  );
};

export default SelectField;

const useStyles = makeStyles({
  span: {
    color: "red",
    position: "absolute",
    right: "5px",
  },
  outlined: {
    padding: "9px 12px !important",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    position: "relative",
  },
  flex1: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  p: {
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#8493ae",
    margin: "0",
  },
  error: {
    color: "#D32F2F !important",
    position: "absolute !important",
    bottom: "-22px",
  },
});
