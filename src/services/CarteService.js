import { axiosPrivate } from "api/axios"
import { AUTH_TOKEN } from "constants/AuthConstant"

const CardService = {}

CardService.getAllCards = function (page) {
  return axiosPrivate({
    method: "get",
    url: `/api/carte/getAll`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}

CardService.getCardById = function (id) {
  return axiosPrivate({
    method: "get",
    url: `/api/carte/getById/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}

CardService.getSearchCards = function (value, page) {
  return axiosPrivate({
    method: "get",
    url: `/api/carte/getAll?page=${page}&query=${value}&limit=10`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}

CardService.deleteCardById = function (id) {
  return axiosPrivate({
    method: "delete",
    url: `/api/carte/deleteById/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}

CardService.createCard = function (data) {
  return axiosPrivate({
    method: "post",
    url: `/api/carte/create`,
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  })
}

CardService.updateCardById = function (id, data) {
  return axiosPrivate({
    method: "put",
    url: `/api/carte/update/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  })
}

export default CardService
