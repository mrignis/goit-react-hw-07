import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css"; // Імпортуємо стилі

const ContactList = () => {
  const [nameFilter, setNameFilter] = useState(""); // Локальний стан для фільтра
  const filteredContacts = useSelector((state) =>
    selectFilteredContacts(state, nameFilter)
  );

  const handleChange = (e) => {
    setNameFilter(e.target.value); // Оновлення значення фільтра
  };

  return (
    <div className={styles.contactList}>
      {/* Використовуємо клас стилів для контейнера */}
      <input
        className={styles.searchInput} // Використовуємо клас стилів для поля пошуку
        type="text"
        value={nameFilter}
        onChange={handleChange}
        placeholder="Search..."
      />
      <ul className={styles.contactItems}>
        {filteredContacts.map((contact) => (
          <li key={contact.id} className={styles.contactItem}>
            {/* Використовуємо клас стилів для елементів */}
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
