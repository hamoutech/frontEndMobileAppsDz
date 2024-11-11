import { axiosPrivate } from "api/axios";
import { AUTH_TOKEN, REFRESH_TOKEN } from "constants/AuthConstant";

const joueurService = {};
joueurService.addPlayer = function (data) {
  return axiosPrivate({
    method: "post",
    url: "/api/joueur/createPlayer",
    data: data.data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

joueurService.UpdatePlayer = function (id, data) {
  return axiosPrivate({
    method: "put",
    url: `/api/joueur/updateJoueur/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

joueurService.getJoueurs = function () {
  return axiosPrivate({
    method: "get",
    url: `/api/joueur/getAll`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

joueurService.getPlayersByFullName = function (fullName) {
  return axiosPrivate({
    method: "get",
    url: `/api/joueur/getAllByFullName?fullName=${fullName}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

joueurService.getOnePlayer = function (id) {
  return axiosPrivate({
    method: "get",
    url: `/api/joueur/getJoueurById/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
joueurService.getPlayers = function () {
  return axiosPrivate({
    method: "get",
    url: `/api/statistics/getPlayers`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
joueurService.getPlayerStat = function (id, data) {
  let url = `/api/statistics/getPlayerStat?id=${id}`;

  if (data.position) {
    url += `&position=${data.position}`;
  }
  if (data.competition) {
    url += `&competition=${data.competition}`;
  }
  if (data.team) {
    url += `&team=${data.team}`;
  }
  if (data.season) {
    url += `&season=${data.season}`;
  }
  if (data.mois) {
    url += `&mois=${data.mois}`;
  }

  return axiosPrivate({
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
joueurService.getplayermatch = function (id, data) {
  let url = `/api/statistics/getplayermatch?id=${id}`;

  if (data.position) {
    url += `&position=${data.position}`;
  }
  if (data.competition) {
    url += `&competition=${data.competition}`;
  }
  if (data.team) {
    url += `&team=${data.team}`;
  }
  if (data.season) {
    url += `&season=${data.season}`;
  }
  if (data.mois) {
    url += `&mois=${data.mois}`;
  }

  return axiosPrivate({
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
joueurService.getplayerbymatchid = function (id, match) {
  let url = `/api/statistics/getplayerbymatchid?id=${id}&match=${match}`;
  return axiosPrivate({
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
joueurService.deletePlayer = function (id) {
  return axiosPrivate({
    // params: {
    //   id: id
    // },
    method: "delete",
    url: `/api/joueur/deleteJoueurById/${id}`,

    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

export default joueurService;
