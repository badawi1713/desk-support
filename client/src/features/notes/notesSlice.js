import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import notesService from "./notesService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getNotes = createAsyncThunk(
  "notes/get",

  async (ticketId, thunkAPI) => {
    try {
      const token = await localStorage.getItem('token')
      return await notesService.getNotes(ticketId, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNotes = createAsyncThunk(
  "notes/create",

  async (data, thunkAPI) => {
    try {
      const token = await localStorage.getItem('token')
      return await notesService.createNotes(data, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action?.payload?.object?.notes;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(createNotes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success('Notes has been added')
      })
      .addCase(createNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      });
  },
});

export const { reset } = notesSlice.actions;
export default notesSlice.reducer;
