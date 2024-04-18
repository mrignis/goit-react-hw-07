import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice"; // Імпорт редюсера фільтрів

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer, // Додайте редюсер фільтрів до кореневого редюсера
  },
});
