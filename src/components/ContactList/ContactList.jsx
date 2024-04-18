import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact, fetchContacts } from "../../redux/contactsOps";
import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import { changeFilter } from "../../redux/filtersSlice";

import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(changeFilter({ name: value }));
  };

  return (
    <div className={styles.contactList}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search contacts..."
        className={styles.searchInput}
      />
      <ul className={styles.contactItems}>
        {filteredContacts.map((contact) => (
          <li key={contact.id} className={styles.contactItem}>
            <Contact
              contact={contact}
              onDelete={handleDeleteContact} // Передача пропа onDelete
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
