import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "pages/login";
import SignUp from "pages/signup";
import Dashboard from "pages/dashboard";
import Consumables from "pages/consumables";
import Navbar from "components/navbar";
import ForgetPass from "components/forget-password";

const Router = () => {
  const classes = useStyles();
  const { token } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token && auth.includes(location.pathname)) {
      navigate("/dashboard");
    }
    if (!token && !auth.includes(location.pathname)) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div className={classes.page}>
        <Routes>
          {!token && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot" element={<ForgetPass />} />
            </>
          )}
          {token && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/for-review/:id" element={<Dashboard />} />
              <Route path="/dashboard/all-patient/1" element={<Dashboard />} />
              <Route path="/consumable" element={<Consumables />} />
            </>
          )}
          <Route path="*" component={() => <Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </>
  );
};

export default Router;

const useStyles = makeStyles({
  page: {
    backgroundColor: "#fafbfd",
  },
});

const auth = ["/login", "/signup", "/forgot"];
