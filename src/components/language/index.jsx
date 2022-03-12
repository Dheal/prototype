import * as React from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { makeStyles } from "@mui/styles";

export default function Language() {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "EN");
  const [otherLang, setOtherLang] = useState("ID");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (val) => {
    const value = val.target.id;
    value !== "EN" && value !== "" && setOtherLang(value);
    setLang(value || (lang !== otherLang ? otherLang : "EN"));
    i18n.changeLanguage(value || (lang !== otherLang ? otherLang : "EN"));
    localStorage.setItem(
      "lang",
      value || (lang !== otherLang ? otherLang : "EN")
    );
    setAnchorEl(null);
  };

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("lang"));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Tooltip title="Language" className={classes.tooltip}>
        <IconButton
          color="primary"
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className={classes.icon}
        >
          {lang || "EN"}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={changeLanguage}
        value="ID"
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            zIndex: 5000,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem id="EN" value="EN">
          {t("language.english")}
        </MenuItem>
        <MenuItem id="ID" value="ID">
          {t("language.indonesian")}
        </MenuItem>
        <MenuItem id="CN" value="CN">
          {t("language.chinese")}
        </MenuItem>
        <MenuItem id="MY" value="MY">
          {t("language.malay")}
        </MenuItem>
      </Menu>
    </>
  );
}

const useStyles = makeStyles({
  icon: {
    fontWeight: "bold",
  },
  tooltip: {
    zIndex: 2000,
    position: "relative !important",
  },
});
