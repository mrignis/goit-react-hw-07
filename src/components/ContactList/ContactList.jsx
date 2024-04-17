import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getVisibleContacts,
  fetchContacts,
  addContact,
  deleteContact,
} from "../../redux/contactsOps";

import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const [nameFilter, setNameFilter] = useState("");
  const dispatch = useDispatch();
  const contacts = useSelector((state) => getVisibleContacts(state));

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleAddContact = (newContact) => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  // Функція для фільтрації контактів за ім'ям або номером
  const filteredContacts = contacts.filter((contact) => {
    const normalizedFilter = nameFilter.toLowerCase();
    const normalizedName = contact.name.toLowerCase();
    const normalizedNumber = contact.number.toLowerCase();
    return (
      normalizedName.includes(normalizedFilter) ||
      normalizedNumber.includes(normalizedFilter)
    );
  });

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
            <Contact contact={contact} onDelete={handleDeleteContact} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
