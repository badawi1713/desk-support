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

const authService = {
  register,
};

export default authService;
