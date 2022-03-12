import React from "react";

import { makeStyles } from "@mui/styles";
import ChatIcon from "@mui/icons-material/Chat";

const MessageBox = () => {
  const classes = useStyles();

  return (
    <>
      
    </>
  );
};

export default MessageBox;

const useStyles = makeStyles({
  positioning: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    cursor: "pointer",
  },
  backColor: {
    backgroundColor: "#06599E",
    borderRadius: "50%",
    height: "50px",
    width: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "#ffffff",
    fontSize: "30px !important",
  },
});
