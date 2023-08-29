import axios from "axios";
import { url } from "./config";
export const verify = () => {
  const token = localStorage.getItem("@token");
  if (!token || token === "undefined") {
    return false;
  }
  return axios
    .get(`${url}/auths/verify`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
    .then(() => true)
    .catch(() => false);
};
export const login = (data) => {
  return axios
    .post(url + "/auths/login", data)
    .then((res) => {
      localStorage.setItem("@email", res.data?.data?.user?.email);
      return res.data?.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const forgetPass = (data) => {
  return axios
    .post(url + "/auths/forget-password", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};
export const updatePassword = (data) => {
  return axios
    .post(
      url + "/auths/update-password",
      { ...data, email: localStorage.getItem("@email") },
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem("@token")}`,
        },
      }
    )

    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};
