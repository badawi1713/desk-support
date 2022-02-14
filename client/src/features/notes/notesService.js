import { Api } from "utils/api";

const getNotes = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await Api.get(`/service/api/v1/tickets/${id}/notes`, config);
  if (response?.data) {
    return response.data;
  }
};

const createNotes = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const {text, id} = data
  const response = await Api.post(`/service/api/v1/tickets/${id}/notes`, {text}, config);
  if (response?.data) {
    return response.data;
  }
}

const notesService = {
  getNotes,
  createNotes
};

export default notesService;
