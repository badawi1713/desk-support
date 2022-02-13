import { toast } from "react-toastify";
import { Api } from "utils/api";
import { history } from "utils/history";
const BASE_URL = `${process.env.REACT_APP_BASE_URL}/v1/tickets`;

const createNewTicket = async (ticketData) => {
  console.log(ticketData)
  const response = await Api.post(`${BASE_URL}/`, ticketData);
  if (response?.data) {
    toast.success(response?.data?.message);
    history.push("/tickets");
    return response.data;
  }
};

const getTickets = async () => {
  const response = await Api.get(`${BASE_URL}/`);
  if (response?.data) {
    return response.data;
  }
};

const ticketService = {
  createNewTicket,
  getTickets,
};

export default ticketService;
