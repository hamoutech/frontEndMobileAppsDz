import { axiosPrivate } from "api/axios";
import { AUTH_TOKEN, REFRESH_TOKEN } from "constants/AuthConstant";

const StadiumService = {};
StadiumService.addStadium = function (data) {
  return axiosPrivate({
    method: "post",
    url: "/api/stadium/createStadium",
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

StadiumService.UpdateStadium = function (data) {
  return axiosPrivate({
    method: "put",
    url: "/api/stadium/updateStadium",
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

StadiumService.getStadium = function () {
  return axiosPrivate({
    method: "get",
    url: `/api/stadium/getStadium`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

export default StadiumService;
