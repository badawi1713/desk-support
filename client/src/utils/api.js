import axios from "axios";
import { sessionExpired } from "features/auth/authSlice";
import jwtDecode from "jwt-decode";
import { getToken } from "./token";

// main config axios
export const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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
      const token = await getToken();

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
    function (response) {
      //Dispatch any action on success
      return response;
    },
    function (error) {
      if (expiredToken < currentDate) {
        dispatch(sessionExpired());
      }
      if (error.response.status === 401) {
        dispatch(sessionExpired());
        //Add Logic to
        //1. Redirect to login page or
        //2. Request refresh token
      }
     
      return Promise.reject(error);
    }
  );
};
