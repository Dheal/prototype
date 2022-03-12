import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function NewTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="disabled tabs example"
    >
      <Tab label="Results" />
      <Tab label="Clinical Notes" disabled />
      <Tab label="Messages" disabled />
      <Tab label="Medical History" disabled />
      <Tab label="Family History" disabled />
      <Tab label="Messages" disabled />
      <Tab label="Health Summary" disabled />
    </Tabs>
  );
}
