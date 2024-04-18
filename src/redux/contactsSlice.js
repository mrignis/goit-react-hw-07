// contactsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps"; // Змінено імпорт

const initialState = {
  items: [],
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
        state.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload); // Виправлено на action.payload
        state.error = null;
      });
  },
});

const { reducer: contactsReducer } = contactsSlice;
export default contactsReducer;
