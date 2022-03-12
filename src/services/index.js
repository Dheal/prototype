import axios from 'config/axios';

export const apiRequest = async (args) => {
  const { type, path, body, params } = args;
  try {
    const res = await axios[type](path, {
      ...(body && body),
      ...(params && { params }),
    });
    return res;
  } catch (err) {
    return err.response;
  }
};
