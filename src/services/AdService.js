import { axiosPrivate } from "api/axios"
import { AUTH_TOKEN, REFRESH_TOKEN } from "constants/AuthConstant"

const adService = {}
adService.addAd = function (data) {
  return axiosPrivate({
    method: "post",
    url: "/api/ads",
    data: data.data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  })
}

adService.UpdateAd = function (id, data) {
  return axiosPrivate({
    method: "put",
    url: `/api/ads/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  })
}

adService.getAd = function (companyName) {
  return axiosPrivate({
    method: "get",
    url: `/api/ads/club/${companyName}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}

adService.getOneAd = function (id) {
  return axiosPrivate({
    method: "get",
    url: `/api/ads/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}
adService.deleteAd = function (id) {
  return axiosPrivate({
    method: "delete",
    url: `/api/ads/${id}`,

    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}
adService.changeVisibilityAd = function (id, data) {
  return axiosPrivate({
    method: "patch",
    url: `/api/ads/change-visibility/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}

export default adService
