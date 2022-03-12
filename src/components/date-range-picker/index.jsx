import * as React from "react";
import TextField from "@mui/material/TextField";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";

const DateRangePicker = ({
  ref,
  value,
  setValue,
  handleClose,
  setDatePicker,
}) => {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDateRangePicker
          displayStaticWrapperAs="desktop"
          value={value}
          ref={ref}
          onBlur={() => {
            setDatePicker(false);
          }}
          onChange={(newValue) => {
            setValue(newValue);
            newValue[1] !== null && handleClose();
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DateRangePicker;
