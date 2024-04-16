import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import store, { persistor } from "./redux/store";
import "./App.css";

import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Contact from "./components/Contact/Contact";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <h1>Книга контактів</h1>
          <div className="container">
            <ContactForm />
            <ContactList />
            <Contact />
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
