import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact, fetchContacts } from "../../redux/contactsOps";
import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import { changeFilter } from "../../redux/filtersSlice";
import { selectNameFilter } from "../../redux/filtersSlice"; // Імпорт селектора для отримання значення фільтру

import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const nameFilter = useSelector(selectNameFilter); // Отримання значення фільтру по імені
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(changeFilter({ name: value })); // Встановлюємо фільтр в Redux store
    dispatch(fetchContacts()); // Отримуємо контакти знову з урахуванням нового фільтру
  };

  return (
    <div className={styles.contactList}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange} // Викликаємо handleChange при зміні значення поля вводу
        placeholder="Search contacts..."
        className={styles.searchInput}
      />
      <ul className={styles.contactItems}>
        {filteredContacts.map((contact) => (
          <li key={contact.id} className={styles.contactItem}>
            <Contact contact={contact} onDelete={handleDeleteContact} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
