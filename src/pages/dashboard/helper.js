import { apiRequest } from "services";

export const getUser = async (dispatch, setCurrentUser) => {
  const res = await apiRequest({
    type: "get",
    path: "/v1/doctor/user",
  });
  if (res?.status === 200) {
    const permissions = Object.keys(res?.data?.personal?.permissions);
    dispatch(
      setCurrentUser({
        ...res.data,
        permissions: ["public", ...permissions],
      })
    );
  }
};

export const getPatientsData = async (
  setTableLoader,
  setCount,
  setData,
  page,
  type,
  keywords,
  userId,
  sortParam
) => {
  setTableLoader(true);
  const res = await apiRequest({
    type: "post",
    path: "/v2/doctor/patient/list",
    body: {
      ...(keywords !== "undefined" && { keywords: keywords }),
      ...(userId !== "undefined" && { child_user_id: userId }),
      page: page,
      sort_by: sortParam || "",
      type: type || 0,
    },
  });
  if (res?.status === 200) {
    const temp = res?.data?.data;
    const newData = temp?.map((patient) => {
      return {
        id: patient?.id || "-",
        ic_number: patient?.ic_number || "-",
        patient_name:
          (patient?.first_name &&
            `${patient?.first_name} ${patient?.last_name || ""}`) ||
          "-",
        date_of_test: patient?.lab.date_of_test || "-",
        updated_at: patient?.lab.updated_at || "-",
        status: labStates[patient?.lab.lab_state_before_type_cast] || "-",
        pdf: patient?.lab?.has_pdf === true ? true : false,
        actions: type === 0 ? "Mark As Reviewed" : "View Records",
      };
    });
    setCount(res.data.lists_total_page);
    setData(newData);
    setTableLoader(false);
  }
  setTableLoader(false);
};

export const getRecordsCount = async (params, setTabsCount, setTableLoader) => {
  setTableLoader(true);
  const res = await apiRequest({
    type: "get",
    path: "https://bm-dev-api.biomarking.com/v2/doctor/patient",
    params: {
      ...(params.keywords !== "undefined" && { keywords: params.keywords }),
      ...(params.child_user_id !== "undefined" && {
        child_user_id: params.child_user_id,
      }),
    },
  });
  if (res?.status === 200) {
    setTabsCount({
      forReview: res.data.counter.unreleased,
      allPatients: res.data.counter.all_patient,
    });
    setTableLoader(false);
  }
  setTableLoader(false);
};

const labStates = ["Partial", "Complete", "Partial", "Updated", "PDF", "PDF"];
