import { axiosPrivate } from "api/axios";
import { AUTH_TOKEN, REFRESH_TOKEN } from "constants/AuthConstant";

const MatchService = {};
MatchService.addMatch = function (data) {
  return axiosPrivate({
    method: "post",
    url: "/api/match/createMatch",
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

MatchService.playersPosition = function (position) {
  return axiosPrivate({
    method: "get",
    url: `/api/joueur/getAllByPosition?position=${position}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

MatchService.UpdateMatch = function (id, data) {
  return axiosPrivate({
    method: "put",
    url: `/api/match/updateMatch/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

MatchService.getMatchs = function () {
  return axiosPrivate({
    method: "get",
    url: `/api/match/getAll`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

MatchService.getOneMatch = function (id) {
  return axiosPrivate({
    method: "get",
    url: `/api/match/getMatchById/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
MatchService.deleteMatch = function (id) {
  return axiosPrivate({
    method: "delete",
    url: `/api/match/deleteMatchById/${id}`,

    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

export default MatchService;
