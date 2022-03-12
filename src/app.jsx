import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import Routes from "routes";
import { getUser } from "pages/dashboard/helper";
import { setCurrentUser } from "store";

const App = () => {
  const { token } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      getUser(dispatch, setCurrentUser, token);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Routes />
      <NotificationContainer />
    </>
  );
};

export default App;
