import { toast } from "react-toastify";
import { Api } from "utils/api";
import { history } from "utils/history";

const createNewTicket = async (ticketData, token) => {  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await Api.post(`/service/api/v1/tickets/`, ticketData, config);
  if (response?.data) {
    toast.success(response?.data?.message);
    history.push("/tickets");
    return response.data;
  }
};

const getTickets = async (page, limit, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await Api.get(`/service/api/v1/tickets/?page=${page}&limit=${limit}`, config);
  if (response?.data) {
    return response.data;
  }
};

const getTicketDetail = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await Api.get(`/service/api/v1/tickets/${id}`, config);
  if (response?.data) {
    return response?.data;
  }
};

const closeTicket = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await Api.put(`/service/api/v1/tickets/${id}`, {
    status: 'closed'
  }, config);
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
