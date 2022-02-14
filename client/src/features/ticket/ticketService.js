import { toast } from "react-toastify";
import { Api } from "utils/api";
import { history } from "utils/history";

const createNewTicket = async (ticketData) => {
  console.log(ticketData);
  const response = await Api.post(`/v1/tickets/`, ticketData);
  if (response?.data) {
    toast.success(response?.data?.message);
    history.push("/tickets");
    return response.data;
  }
};

const getTickets = async (page, limit) => {
  const response = await Api.get(`/v1/tickets/?page=${page}&limit=${limit}`);
  if (response?.data) {
    return response.data;
  }
};

const getTicketDetail = async (id) => {
  const response = await Api.get(`/v1/tickets/${id}`);
  if (response?.data) {
    return response?.data;
  }
};

const closeTicket = async (id) => {
  const response = await Api.put(`/v1/tickets/${id}`, {
    status: 'closed'
  });
  console.log(response)
  if (response?.data) {
    return response?.data;
  }
};

const ticketService = {
  createNewTicket,
  getTickets,
  getTicketDetail,
  closeTicket
};

export default ticketService;
