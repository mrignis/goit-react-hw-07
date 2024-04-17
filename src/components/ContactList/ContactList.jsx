import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsOps";

import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const [nameFilter, setNameFilter] = useState("");
  const filteredContacts = useSelector((state) =>
    selectFilteredContacts(state, nameFilter)
  ); // Виправлення передачі аргументів в селектор

  const handleChange = (e) => {
    setNameFilter(e.target.value);
  };

  return (
    <div className={styles.contactList}>
      <input
        className={styles.searchInput}
        type="text"
        value={nameFilter}
        onChange={handleChange}
        placeholder="Search..."
      />
      <ul className={styles.contactItems}>
        {filteredContacts.map((contact) => (
          <li key={contact.id} className={styles.contactItem}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
