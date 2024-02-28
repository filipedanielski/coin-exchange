import axiosLib from "axios";
import { router } from "../router";

const axios = axiosLib.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
  },
});

axios.interceptors.response.use(null, (err) => {
  const error = {
    status: err.response?.status,
    original: err,
    validation: {},
    message: null,
  };

  if (err.response?.status === 422) {
    for (let field in err.response.data.errors) {
      error.validation[field] = err.response.data.errors[field][0];
    }
  } else {
    error.message = err.response.data.error;
  }

  if ([401, 419].includes(err.response?.status)) {
    // redirect to login
    router.push({ name: 'login' });
  }

  return Promise.reject(error);
});

export default axios;
