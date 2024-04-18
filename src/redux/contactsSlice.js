// contactsSlice.js

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

// Використовуємо createSelector для створення селектора з кешуванням результатів
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    // Перевіряємо, чи не є nameFilter пустим або невизначеним перед викликом toLowerCase()
    const filterText = nameFilter ? nameFilter.toLowerCase() : "";
    // Фільтруємо контакти тільки в тому випадку, якщо nameFilter не пустий
    return nameFilter
      ? contacts.filter(
          (contact) =>
            contact.name.toLowerCase().includes(filterText) || // Використовуємо filterText замість nameFilter.toLowerCase()
            contact.phoneNumber.includes(filterText)
        )
      : contacts; // Якщо nameFilter пустий, повертаємо усі контакти без фільтрації
  }
);

const { reducer: contactsReducer } = contactsSlice;
export default contactsReducer;
