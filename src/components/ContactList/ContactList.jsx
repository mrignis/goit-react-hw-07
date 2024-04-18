import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import Contact from "../Contact/Contact";
import { selectNameFilter } from "../../redux/filtersSlice";

import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectNameFilter);
  const contacts = useSelector((state) => state.contacts.items);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
      contact.phoneNumber.includes(nameFilter)
  );

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className={styles.contactList}>
      <input
        className={styles.searchInput}
        type="text"
        value={nameFilter}
        placeholder="Search..."
        readOnly // Забороняє введення тексту у поле
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
