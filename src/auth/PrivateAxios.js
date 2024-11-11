import axios from "axios";

const service = axios.create({
  baseURL: "https://backend.mobile-apps-dz.com",
  withCredentials: true,
});

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // let notificationParam = {
    //   message: "",
    // };

    // Remove token and redirect
    // if (unauthorizedCode.includes(error.response.status)) {
    //   notificationParam.message = "Authentication Fail";
    //   notificationParam.description = "Please login again";
    //   localStorage.removeItem(AUTH_TOKEN);

    //   store.dispatch(signOutSuccess());
    // }

    if (error.response.status === 401) {
      console.log("unauthorized");
    }

    return Promise.reject(error);
  }
);

export default service;
