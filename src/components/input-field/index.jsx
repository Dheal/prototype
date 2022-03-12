import React, { useState } from "react";
import { makeStyles } from "@mui/styles";

import {
  TextField as Input,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { SearchSharp, Visibility, VisibilityOff } from "@mui/icons-material";
import { theme } from "config/theme";

import singapore from "assets/singapore.png";

const InputField = ({
  register,
  fieldName,
  label,
  required,
  placeholder,
  type,
  value,
  setValue,
  inputInput,
  cClass,
  inputClass,
  height,
  inputProps,
  error,
  errorMessage,
  handleChange,
  max,
  code
}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={classes.flex}>
        <p className={classes.p} style={{ color: error ? "#d32f2f" : "" }}>
          {label}
        </p>
        {required && <span className={classes.span}>*</span>}
      </div>
      <Input
        id="outlined-basic"
        variant="outlined"
        style={{ padding: "6px 12px !important" }}
        className={`${cClass} ${error && classes.error}`}
        placeholder={placeholder}
        classes={{
          root: `${classes.root} ${height}`,
        }}
        value={value}
        FormHelperTextProps={{
          className: classes.helperText,
        }}
        type={type !== "password" ? type : showPassword ? "text" : "password"}
        onChange={(e) => {
          setValue && setValue(e.target.value);
          handleChange(e);
        }}
        error={error}
        helperText={errorMessage && errorMessage}
        {...(register && register(fieldName))}
        onInput={(e) => {
          if (max) {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, max);
          }
        }}
        InputProps={{
          ...(inputProps && { inputProps }),
          classes: {
            input: `${classes.input} ${inputInput}`,
          },
          ...(type === "password" && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }),
          ...(fieldName === "contact_number" && {
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={singapore}
                  alt="singapore"
                  width="30px"
                  className={classes.singapore}
                />
                <Typography variant="body1" color="initial">
                  +65
                </Typography>
              </InputAdornment>
            ),
          }),
          ...(fieldName === "mobile_number" && {
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="body1" color="initial">
                  {code}
                </Typography>
              </InputAdornment>
            ),
          }),
          ...(fieldName === "dashSearch" && {
            startAdornment: (
              <InputAdornment position="start">
                <SearchSharp />
              </InputAdornment>
            ),
          }),
        }}
      />
    </>
  );
};

export default InputField;

const useStyles = makeStyles({
  helperText: {
    position: "absolute !important",
    bottom: "-22px",
  },

  input: {
    borderRadius: "2px",
    fontSize: 16,
    width: "100%",
    padding: "7px 12px !important",
    height: "27px !important",
    transition: theme.transitions.create(["border-color", "box-shadow"]),

    "& .MuiInputBase-input": {
      color: "#000000 !important",
      padding: "19px 29px !important",
    },
    "&:focus": {
      boxShadow: "none",
      borderColor: "none",
    },
  },
  singapore: {
    marginRight: "10px",
  },
  error: {
    color: "red",
  },
  span: {
    color: "red",
    position: "absolute",
    right: "5px",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
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
});
