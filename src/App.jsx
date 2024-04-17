// App.jsx
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import { fetchContacts } from "./redux/contactsOps";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <div className="app">
        <h1>Contacts App</h1>
        <ContactForm />
        <ContactList />
      </div>
    </Provider>
  );
};

export default App;
