import { axiosPrivate } from "api/axios"
import { AUTH_TOKEN } from "constants/AuthConstant"

const ClientService = {}

ClientService.getAllClients = function (page) {
  return axiosPrivate({
    method: "get",
    url: `/api/client/getAll`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}

ClientService.getClientById = function (id) {
  return axiosPrivate({
    method: "get",
    url: `/api/client/getById/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}

ClientService.getSearchClients = function (value, page) {
  return axiosPrivate({
    method: "get",
    url: `/api/client/getAll?page=${page}&clientName=${value}&limit=10`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}

ClientService.validateAccount = function (id) {
  return axiosPrivate({
    method: "put",
    url: `/api/client/validated/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}

ClientService.banAccount = function (id, reason) {
  return axiosPrivate({
    method: "put",
    url: `/api/client/banned/${id}`,
    data: {
      argument: reason,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}

ClientService.deleteAccount = function (id) {
  return axiosPrivate({
    method: "delete",
    url: `/api/client/deleteById/${id}`,

    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  })
}

export default ClientService
