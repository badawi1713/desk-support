import { toast } from "react-toastify";
import { Api } from "utils/api";
import { history } from "utils/history";

// Register user
const register = async (userData) => {
  const response = await Api.post(`/service/api/v1/users/register`, userData);

  if (response?.data) {
    toast.success(response.data.message);
    localStorage.setItem("user", JSON.stringify(response?.data?.object));
    history.push("/");
    return response.data;
  }
};

// Login user
const login = async (userData) => {
  const response = await Api.post(`/service/api/v1/users/login`, userData);
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
  invalidToken,
};

export default authService;
