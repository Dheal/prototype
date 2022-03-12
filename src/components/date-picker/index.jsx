import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { makeStyles } from "@mui/styles";

const ResponsiveDatePicker = ({
  label,
  required,
  control,
  fieldName,
  error,
  errorMessage,
  future = true,
}) => {
  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={classes.flex}>
        <p className={classes.p}>{label}</p>
        {required && <span className={classes.span}>*</span>}
      </div>
      <Controller
        name={fieldName}
        control={control}
        render={({ field: { ref, name, value, onChange } }) => {
          return (
            <DatePicker
              disableFuture={future}
              inputRef={ref}
              name={name}
              value={value}
              onChange={onChange}
              error={error}
              helperText={errorMessage && errorMessage}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    classes: {
                      input: classes.input,
                    },
                  }}
                  readOnly
                  error={error}
                  helperText={errorMessage && errorMessage}
                />
              )}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default ResponsiveDatePicker;

const useStyles = makeStyles({
  span: {
    color: "red",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    marginBottom: "3px",
  },
  input: {
    padding: "9px 12px !important",
  },
  p: {
    fontFamily: "Mulish ",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#8493ae",
    margin: "0",
  },
});
