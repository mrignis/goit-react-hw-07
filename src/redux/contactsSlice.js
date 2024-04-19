// contactsSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://661eba0616358961cd92b193.mockapi.io";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.error = null;
      });
  },
});

export const selectContacts = (state) => state.contacts.items;
export const selectNameFilter = (state) => state.filters.nameFilter;

// Вибираємо всі контакти без фільтрації
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => contacts
);

const { reducer: contactsReducer } = contactsSlice;
export default contactsReducer;
