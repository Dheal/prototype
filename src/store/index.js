import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app-slice";
import bankDetailsSlice from "./bank-details-slice";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    bankDetails: bankDetailsSlice.reducer,
  },
});

export const { setDashActiveTab, setCurrentUser, setToken, setLogout } =
  appSlice.actions;
