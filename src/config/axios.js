import axios from "axios";
import { createNotification } from "common/create-notification";

import { store, setLogout } from "store";

const noError = ["/v2/sessions", "/v2/doctor/account"];

axios.defaults.baseURL = "https://bm-dev-api.biomarking.com";
axios.defaults.headers = {
  "x-biomark-group": "quest-doctor",
  "x-portal-type": "innoquest",
  "x-product-code": "QUEST123",
};

axios.interceptors.request.use(
  (successfulReq) => {
    const state = store.getState();
    const token = state?.app?.token;
    successfulReq.headers["x-biomark-token"] = token;
    return successfulReq;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (successRes) => {
    return successRes;
  },
  (error) => {
    if (!noError.includes(error.response?.config?.url) && error.response) {
      createNotification(
        "error",
        "Error",
        error?.response?.data?.error || "something went wrong"
      );
    }
    if (error?.response?.statusText === "Unauthorized") {
      store.dispatch(setLogout(""));
    }
    return Promise.reject(error);
  }
);

export default axios;
