import axios from "axios"
import { refresh, setRefresh } from "store/slices/authSlice"
import { signOut } from "store/slices/authSlice"
import store from "../store"
const BASE_URL = "https://backend.mobile-apps-dz.com/"
// const BASE_URL = "http://localhost:4001/"
const TOKEN_PAYLOAD_KEY = "Authorization"
export default axios.create({
  baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
})

axiosPrivate.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const prevRequest = error?.config
    if (error?.response?.data?.rtChecked) {
      store.dispatch(signOut())
    } else {
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true
        const newAccessToken = await store.dispatch(refresh())
        prevRequest.headers[
          "Authorization"
        ] = `Bearer ${newAccessToken.payload}`
        return axiosPrivate(prevRequest)
        // if (error.response.data.errorKey === "E510") {
        //   store.dispatch(refresh());
        //   // store.dispatch(setRefresh());
        // }
      }
    }

    return Promise.reject(error)
  }
)
