import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupIcon from "@mui/icons-material/Group";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

import {
  Container,
  Button,
  IconButton,
  Badge,
  Typography,
} from "@mui/material";

import ProfileMenu from "components/profile-menu";
import SwipeableTemporaryDrawer from "components/navbar/side-drawer";
import Language from "components/language";

import { theme } from "config/theme";
import useWindowDimensions from "hooks/use-dimension-hook";



const Navbar = () => {
  const { t } = useTranslation();
  //   const langOptions = [
  //     {
  //         id: 'EN',
  //         name: "English"
  //     },
  //     {
  //         id: 'ID',
  //         name: "Indonesia"
  //     }
  // ]
  //const [setLang] = useState('');
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { width } = useWindowDimensions();
  const { token, currentUser } = useSelector((state) => state.app);
  const [login, setLogin] = useState(true);
  const [links, setLinks] = useState([]);
  const [forget, setForget] = useState(false);
  const [activeLink, setActiveLink] = useState(200 * 200);
  //   const changeLanguage = (val) =>{
  //     setLang(val);
  //     i18n.changeLanguage(val);
  //     localStorage.setItem('lang', val)
  // }
  const isMd = () => {
    return width !== null && width > 650;
  };

  useEffect(() => {
    let tempLinks = [];
    currentUser?.permissions?.forEach((permission, index) => {
      const currentLink = linksTemp.find((x) => x.permission === permission);
      currentLink?.route && tempLinks.push(currentLink);

      if (index === currentUser?.permissions.length - 1) {
        setLinks(tempLinks);
      }
    });

    location.pathname.includes("login") ? setLogin(true) : setLogin(false);
    location.pathname.includes("forgot") ? setForget(true) : setForget(false);
    let match = false;
    links.forEach(({ route }, index) => {
      if (location.pathname.includes(route)) {
        match = true;
        setActiveLink(index);
      }
      if (!match && !location.pathname.includes(route)) {
        setActiveLink(200 * 200);
      }
    });
    // eslint-disable-next-line
  }, [location.pathname, currentUser?.permissions]);

  return (
    <div className={classes.navMain}>
      <Container maxWidth="lg">
        <div className={classes?.main}>
          <img
            alt="logo"
            className={classes.logo}
            onClick={() => {
              navigate("/dashboard");
            }}
          />
          {token ? (
            <div className={classes.linksMain}>
              {isMd() && (
                <>
                  <div className={classes.linksContainer}>
                    {links.map(({ title, route }, index) => (
                      <Link
                        className={`${classes.link} ${
                          activeLink === index && classes.activeLink
                        }`}
                        to={route}
                        key={index}
                      >
                        {t("header." + title)}
                      </Link>
                    ))}
                  </div>
                  <div className={classes.signContainer}>
                    <ProfileMenu />
                   
                    {/* <Typography variant="h6" className={classes.typo}>
                    {t('header.doctor')}
                    </Typography> */}
                  </div>
                </>
              )}
              {!isMd() && <SwipeableTemporaryDrawer />}
            </div>
          ) : (
            <div className={classes.signContainer}>
              <>
                
              </>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

const useStyles = makeStyles({
  typo: {
    fontFamily: "Mulish !important",
    marginLeft: "20px !important",
    color: "#8493AE !important",
  },
  signContainer: {
    borderLeft: "1px solid #eeeeee",
    paddingLeft: "30px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: "50px",
    },
  },
  signBtn: {
    fontSize: "16px !important",
    minWidth: "150px !important",
    borderRadius: "30px !important",
    fontFamily: "Mulish !important",
    textTransform: "initial !important",
    borderColor: "#06599E !important",
    color: "#06599E !important",
    height: "47px !important",
    [theme.breakpoints.down("md")]: {
      fontSize: "10px !important",
      minWidth: "100px !important",
      height: "30px !important",
    },
  },
  navMain: {
    height: "70px",
    boxShadow: "0px 10px 20px 0px #cccccc59",
    backgroundColor: "#ffffff",
    position: "relative",
    zIndex: 1300,
    [theme.breakpoints.down("md")]: {
      height: "50px",
    },
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  signUp: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: "57px",
    margin: "6px 0",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      height: "30px",
    },
  },

  linksMain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  linksContainer: {
    marginRight: "30px",
  },
  link: {
    cursor: "pointer",
    fontFamily: "Mukta !important",
    fontSize: "15px !important",
    fontWeight: 700,
    padding: "8px 0 8px 0",
    margin: "0 16px 0 16px",
    textDecoration: "none",
    color: "#8493AE",
  },
  activeLink: {
    color: "#054E8B",
  },
  group: {
    color: "#d9dfeb",
  },
  notification: {
    color: "#8493ae",
  },
});

const linksTemp = [
 
];
