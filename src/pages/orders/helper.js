import { apiRequest } from "services";

export const getOrderHistory = async (setTableLoader, setData, params) => {
  setTableLoader(true);
  const res = await apiRequest({
    type: "get",
    path: "/v2/doctor/order/get_order_worklist",
  });
  if (res?.status === 200) {
    setTableLoader(false);
  }
  setTableLoader(false);
};

export const columns = [
  {
    key: "created_date",
    title: "CREATED DATE TIME",
    sort: true,
    align: "center",
  },
  { key: "patient_name", title: "PATIENT NAME", sort: true, align: "center" },
  { key: "ic_number", title: "IC NUMBER", align: "center" },
  { key: "dateBirth", title: " DATE OF BIRTH", align: "center" },
  { key: "testObtained", title: "TEST TO BE OBTAINED", align: "center" },
];

export const rows = [
  {
    created_date: "Jan 25,2020",
    patient_name: "Haleema Mughal",
    ic_number: "12345",
    dateBirth: "13-07-1998",
    testObtained: "All possible tests",
  },
  {
    created_date: "Jan 25,2020",
    patient_name: "Haleema Mughal",
    ic_number: "12345",
    dateBirth: "13-07-1998",
    testObtained: "All possible tests",
  },
  {
    created_date: "Jan 25,2020",
    patient_name: "Haleema Mughal",
    ic_number: "12345",
    dateBirth: "13-07-1998",
    testObtained: "All possible tests",
  },
  {
    created_date: "Jan 25,2020",
    patient_name: "Haleema Mughal",
    ic_number: "12345",
    dateBirth: "13-07-1998",
    testObtained: "All possible tests",
  },
  {
    created_date: "Jan 25,2020",
    patient_name: "Haleema Mughal",
    ic_number: "12345",
    dateBirth: "13-07-1998",
    testObtained: "All possible tests",
  },
];
