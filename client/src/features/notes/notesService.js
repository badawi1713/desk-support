import { Api } from "utils/api";

const getNotes = async (id) => {
  const response = await Api.get(`/v1/tickets/${id}/notes`);
  if (response?.data) {
    return response.data;
  }
};

const notesService = {
  getNotes,
};

export default notesService;
