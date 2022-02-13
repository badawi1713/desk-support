import axios from "axios";
import { toast } from "react-toastify";
import { history } from "utils/history";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/v1/users`;

// Register user
const register = async (userData) => {
  const response = await axios.post(`${BASE_URL}/register`, userData);

  if (response?.data) {
    toast.success(response.data.message);
    localStorage.setItem("user", JSON.stringify(response?.data?.object));
    history.push("/");
    return response.data;
  }
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${BASE_URL}/login`, userData);
  if (response?.data) {
    toast.success(response.data.message);
    localStorage.setItem("user", JSON.stringify(response?.data?.object));
    history.push("/");
    return response.data;
  }
};

const logout = async () => {
  localStorage.removeItem("user");
  toast.success("You have logged out");
  history.push("/login");
};

const sessionExpired = async () => {
  localStorage.removeItem("user");
  toast.error("Your session has been expired");
  history.push("/login");
};

const invalidToken = async () => {
  localStorage.removeItem("user");
  toast.error("Invalid Token");
  history.push("/login");
};

const authService = {
  register,
  logout,
  login,
  sessionExpired,
  invalidToken
};

export default authService;
