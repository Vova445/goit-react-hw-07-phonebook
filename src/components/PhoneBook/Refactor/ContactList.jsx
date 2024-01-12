import React from "react";
import styles from '../Phonebook.module.css';
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../../Redux/contactSlice";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const filter = useSelector((state) => state.contacts.filter);

  const filteredContacts = contacts.filter(
    (contact) => contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleClearContacts = () => {
    filteredContacts.forEach((contact) => {
      dispatch(deleteContact(contact.id));
    });
  };
  

  return (
    <div>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button onClick={() => handleDeleteContact(contact.id)} className={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleClearContacts} className={styles.clearContactsButton}>
        Clear Contacts
      </button>
    </div>
  );
};

export default ContactList;
