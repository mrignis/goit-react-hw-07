import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
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
        // Видалення контакту за його id
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.error = null;
      });
  },
});

export const selectContacts = (state) => state.contacts.items;
export const selectNameFilter = (state) => state.filters.nameFilter;

// Вибірка всіх контактів без фільтрації
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => contacts
);

const { reducer: contactsReducer } = contactsSlice;
export default contactsReducer;
