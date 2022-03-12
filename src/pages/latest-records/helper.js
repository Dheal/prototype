import { apiRequest } from "services";

export const toPascalCase = (input) => {
  return `${input}`
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w+)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, "g"), "")
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};

export const base64ToArrayBuffer = (base64) => {
  const binaryString = window.atob(base64);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
};

export const getPatientsDetailsLatest = async (id, setPatientDetails) => {
  const res = await apiRequest({
    type: "get",
    path: `/v2/doctor/patient/${id}/detail/`,
  });
  if (res?.status === 200) {
    setPatientDetails(res.data);
  }
};

export const saveByteArray = (reportName, byte) => {
  const blob = new Blob([byte], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  const fileName = reportName;
  link.download = fileName;
  link.click();
};

export const reviewReport = async (data, id, index) => {
  const res = await apiRequest({
    type: "post",
    path: `v2/doctor/patient/${id}/release_old_result`,
    body: {
      lab_id: data.id,
    },
  });
  if (res?.status === 200) {
  }
};

export const downloadPdf = async (latestResult, params) => {
  const res = await apiRequest({
    type: "post",
    path: `/v2/doctor/patient/${params.id}/download_pdf`,
    body: { lab_id: latestResult?.id },
  });
  if (res?.status === 200) {
    const sampleArr = base64ToArrayBuffer(res?.data?.data);
    saveByteArray(res?.data?.fileName, sampleArr);
  }
};

export const getPatientsDetails = async (
  patientId,
  setLatestResult,
  openPdf
) => {
  const res = await apiRequest({
    type: "get",
    path: `/v2/doctor/patient/${patientId}/latest_result/`,
  });
  if (res?.status === 200) {
    setLatestResult(res?.data.latest_result);
    if (openPdf) {
      window.location.href = res?.data?.latest_result?.latest_pdf || "";
    }
  }
};
