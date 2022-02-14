import axios from "axios";
import { invalidToken, sessionExpired } from "features/auth/authSlice";
import jwtDecode from "jwt-decode";
import { getToken } from "./token";

export const Api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  mode: "no-cors",
  credentials: true,
  crossdomain: true,
});

export const AxiosSetup = async (store) => {
  const { dispatch } = store;
  const token = await getToken();
  const expiredToken = token ? jwtDecode(token).exp : null;
  const currentDate = new Date().getTime() / 1000;

  Api.interceptors.request.use(
    async (request) => {
      request.headers.common["Authorization"] = `Bearer ${token}`;
      return request;
    },
    (config) => {
      return config;
    },
    (err) => {
      console.log("error response", err);
      return Promise.reject(err);
    }
  );
  Api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (token) {
        if (expiredToken < currentDate) {
          dispatch(sessionExpired());
        }
        if (error.response.status === 401) {
          dispatch(invalidToken());
        }
      }
      if (error.response.status === 401) {
        dispatch(invalidToken());
      }

      return Promise.reject(error);
    }
  );
};
