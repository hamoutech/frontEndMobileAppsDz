import { axiosPrivate } from "api/axios";
import { AUTH_TOKEN, REFRESH_TOKEN } from "constants/AuthConstant";

const partnerService = {};
partnerService.addPartner = function (data) {
  return axiosPrivate({
    method: "post",
    url: "/api/partner/createPartner",
    data: data.data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

partnerService.UpdatePartner = function (id, data) {
  return axiosPrivate({
    method: "put",
    url: `/api/partner/updatePartner/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

partnerService.getPartner = function () {
  return axiosPrivate({
    method: "get",
    url: `/api/partner/getAll`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

partnerService.getOnePartner = function (id) {
  return axiosPrivate({
    method: "get",
    url: `/api/partner/getPartnerById/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
partnerService.deletePartner = function (id) {
  return axiosPrivate({
    // params: {
    //   id: id
    // },
    method: "delete",
    url: `/api/partner/deletePartnerById/${id}`,

    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

export default partnerService;
