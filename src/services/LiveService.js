import { axiosPrivate } from "api/axios";
import { AUTH_TOKEN, REFRESH_TOKEN } from "constants/AuthConstant";

const LiveService = {};
LiveService.addlive = function (data) {
  return axiosPrivate({
    method: "post",
    url: "/api/live/createLive",
    data: data.liveData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

LiveService.UpdateLive = function (id, data) {
  return axiosPrivate({
    method: "put",
    url: `/api/live/updateLive/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

LiveService.getLives = function () {
  return axiosPrivate({
    method: "get",
    url: `/api/live/getAll`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

LiveService.getOneLive = function (id) {
  return axiosPrivate({
    method: "get",
    url: `/api/live/getLiveById/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
LiveService.deleteLive = function (id) {
  return axiosPrivate({
    method: "delete",
    url: `/api/live/deleteLiveById/${id}`,

    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

export default LiveService;
