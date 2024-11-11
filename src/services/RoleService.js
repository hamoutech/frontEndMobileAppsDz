import { axiosPrivate } from "api/axios";
import { AUTH_TOKEN } from "constants/AuthConstant";

const RoleService = {};

RoleService.getRoles = function () {
  return axiosPrivate({
    url: "api/role/getAll",
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

RoleService.getOneRole = function (id) {
  return axiosPrivate({
    url: `api/role/${id}`,
    method: "get",

    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

RoleService.updateOneRole = function (id, data) {
  let privileges = data;

  return axiosPrivate({
    url: `api/role/${id}`,
    method: "put",
    data: privileges,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
RoleService.addOneRole = function (data) {
  console.log("service", data);
  return axiosPrivate({
    url: `api/role/createRole`,
    method: "post",
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
RoleService.deleteRole = function (id) {
  return axiosPrivate({
    params: {
      id: id,
    },
    url: `api/role`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

export default RoleService;
