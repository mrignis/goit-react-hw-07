import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store"; // Змінено імпорт

import "./App.css";

import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import { fetchContacts } from "./redux/contactsOps"; // Імпорт операції fetchContacts

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts()); // Запуск операції fetchContacts при завантаженні компоненту
  }, [dispatch]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <h1>Книга контактів</h1>
          <div className="container">
            <ContactForm />
            <SearchBox />
            <ContactList />
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
