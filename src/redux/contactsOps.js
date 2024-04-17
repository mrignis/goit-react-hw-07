import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://661eba0616358961cd92b193.mockapi.io"; // Встановлюємо ваш API endpoint як базовий URL

// Оголошуємо операцію для отримання масиву контактів
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll", // Базовий тип екшену
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts"); // Виконуємо GET запит для отримання контактів
      return response.data; // Повертаємо дані контактів
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Повертаємо помилку разом з повідомленням
    }
  }
);

// Оголошуємо операцію для додавання нового контакту
export const addContact = createAsyncThunk(
  "contacts/addContact", // Базовий тип екшену
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", contact); // Виконуємо POST запит для додавання контакту
      return response.data; // Повертаємо дані нового контакту
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Повертаємо помилку разом з повідомленням
    }
  }
);

// Оголошуємо операцію для видалення контакту за ID
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact", // Базовий тип екшену
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`); // Виконуємо DELETE запит для видалення контакту
      return contactId; // Повертаємо ID видаленого контакту
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Повертаємо помилку разом з повідомленням
    }
  }
);

export const getContacts = (state) => state.contacts.items;

export const getFilter = (state) => state.filter;

export const getVisibleContacts = (state) => {
  const contacts = getContacts(state);
  const filter = getFilter(state);
  const normalizedFilter = filter.toLowerCase();

  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};
