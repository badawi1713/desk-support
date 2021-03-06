import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ticketService from "./ticketService";

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  page: 0,
  limit: 10,
  total: 0,
};

export const createNewTicket = createAsyncThunk(
  "ticket/create",

  async (ticketData, thunkAPI) => {
    try {
      const token = await localStorage.getItem('token')
      return await ticketService.createNewTicket(ticketData, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTickets = createAsyncThunk(
  "ticket/get",

  async (_, thunkAPI) => {
    const { ticket } = await thunkAPI.getState();
    const { page, limit } = ticket;
    const token = await localStorage.getItem('token')
    try {
      return await ticketService.getTickets(page, limit, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTicketDetail = createAsyncThunk(
  "ticket/get-detail",

  async (id, thunkAPI) => {
    try {
      const token = await localStorage.getItem('token')
      return await ticketService.getTicketDetail(id, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const closeTicket = createAsyncThunk(
  "ticket/close",

  async (id, thunkAPI) => {
    try {
      const token = await localStorage.getItem('token')
      return await ticketService.closeTicket(id, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ticketSlice = createSlice({
  name: "ticket",
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewTicket.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createNewTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createNewTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        toast.error(action.payload);
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = action?.payload?.object?.tickets;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        toast.error(action.payload);
      })
      .addCase(getTicketDetail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTicketDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action?.payload?.object?.ticket;
        state.total = action?.payload?.object?.total;
      })
      .addCase(getTicketDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        toast.error(action.payload);
      })
      .addCase(closeTicket.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets?.map((item) =>
          item._id === action.payload?.object?.ticket?._id
            ? (item.status = "closed")
            : item
        );
        state.ticket.status = "closed";
        toast.success("Ticket has been closed");
      })
      .addCase(closeTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        toast.error(action.payload);
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
