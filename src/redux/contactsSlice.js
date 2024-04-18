import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect"; // Додано імпорт

import { fetchContacts, addContact, deleteContact } from "./contactsOps";

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

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    const filterText = nameFilter ? nameFilter.toLowerCase() : "";
    return nameFilter
      ? contacts.filter(
          (contact) =>
            contact.name.toLowerCase().includes(filterText) ||
            contact.phoneNumber.includes(filterText)
        )
      : contacts;
  }
);

export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.error;
export const selectFilter = (state) => state.filter;

const { reducer: contactsReducer } = contactsSlice;
export default contactsReducer;
