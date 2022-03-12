export const removeKey = (data) => {
  const keys = [
    "contactNumber_code",
    "contactNumber",
    "mobileNumber_code",
    "mobileNumber",
  ];

  for (const key in data) {
    if (data[key] !== 0) {
      if (keys.includes(key) || !data[key]) {
        delete data[key];
      }
      (keys.includes(key) || !data[key]) && delete data[key];
    }
  }
  return data;
};
