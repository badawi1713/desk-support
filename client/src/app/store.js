import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import notesReducer from "features/notes/notesSlice";
import ticketReducer from "features/ticket/ticketSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
    notes: notesReducer,
  },
});

export default store;
