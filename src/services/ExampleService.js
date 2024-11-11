import { axiosPrivate } from "api/axios";
import { AUTH_TOKEN } from "constants/AuthConstant";

const ExampleService = {};

ExampleService.getUsers = function () {
  return axiosPrivate({
    url: "/api/admin/getAll",
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

ExampleService.getOneUser = function (id) {
  return axiosPrivate({
    url: `/users/${id}`,
    method: "get",

    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

ExampleService.updateOneUser = function (id, data) {
  let privileges = data;

  return axiosPrivate({
    url: `/users/${id}`,
    method: "put",
    data: privileges,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
ExampleService.addOneUser = function (data) {
  return axiosPrivate({
    url: `/api/admin/createAdmin`,
    method: "post",
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
ExampleService.deleteUser = function (id) {
  return axiosPrivate({
    url: `/api/admin/deleteAdmin/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

export default ExampleService;
