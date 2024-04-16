// Contact.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import "./Contact.css"; // Імпортуйте CSS файл

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  if (!contact) {
    return null;
  }

  return (
    <div className="contact">
      <h3>{contact.name}</h3>
      <p>{contact.phone}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Contact;
