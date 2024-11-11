import { axiosPrivate } from "api/axios"
import { AUTH_TOKEN, REFRESH_TOKEN } from "constants/AuthConstant"

const StaffService = {
  addStaff: function (data) {
    return axiosPrivate({
      method: "post",
      url: "/api/staff/createStaff",
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    })
  },

  UpdateStaff: function (id, data) {
    return axiosPrivate({
      method: "put",
      url: `/api/staff/updateStaff/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    })
  },

  ToggleStatusParent: function (id, data) {
    return axiosPrivate({
      method: "put",
      url: `/parents/toggleParentStatus/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    })
  },

  getStaffs: function () {
    return axiosPrivate({
      method: "get",
      url: `/api/staff/getAll`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    })
  },

  getOneStaff: function (id) {
    return axiosPrivate({
      method: "get",
      url: `/api/staff/getStaffById/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    })
  },
  deleteStaff: function (id) {
    return axiosPrivate({
      // params: {
      //   id: id
      // },
      method: "delete",
      url: `/api/staff/deleteStaffById/${id}`,

      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    })
  },
  toggleStatus: function (id, data) {
    return axiosPrivate({
      method: "put",
      url: `/parents/toggleParentStatus/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    })
  },
}

export default StaffService
