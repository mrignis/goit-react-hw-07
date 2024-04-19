import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import "./Contact.css";

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
      <p>{contact.phoneNumber}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Contact;
