import { axiosPrivate } from "api/axios";
import { AUTH_TOKEN, REFRESH_TOKEN } from "constants/AuthConstant";

const newsService = {};
newsService.addNews = function (data) {
  return axiosPrivate({
    method: "post",
    url: "/api/news/createNews",
    data: data.data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

newsService.UpdateNews = function (id, data) {
  return axiosPrivate({
    method: "put",
    url: `/api/news/updateNews/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

newsService.getNews = function () {
  return axiosPrivate({
    method: "get",
    url: `/api/news/getAll`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

newsService.getOneNews = function (id) {
  return axiosPrivate({
    method: "get",
    url: `/api/news/getNewsById/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
newsService.deleteNews = function (id) {
  return axiosPrivate({
    // params: {
    //   id: id
    // },
    method: "delete",
    url: `/api/news/deleteNewsById/${id}`,

    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

export default newsService;
