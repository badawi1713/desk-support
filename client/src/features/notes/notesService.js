import { Api } from "utils/api";

const getNotes = async (id) => {
  const response = await Api.get(`/service/v1/tickets/${id}/notes`);
  if (response?.data) {
    return response.data;
  }
};

const createNotes = async (data) => {
  const {text, id} = data
  const response = await Api.post(`/service/v1/tickets/${id}/notes`, {text});
  if (response?.data) {
    return response.data;
  }
}

const notesService = {
  getNotes,
  createNotes
};

export default notesService;
