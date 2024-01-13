import React from "react";
import styles from '../Phonebook.module.css';
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../../Redux/contactSlice";
import { Report } from 'notiflix/build/notiflix-report-aio';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const filter = useSelector((state) => state.contacts.filter);
  const isDeleting = useSelector((state) => state.contacts.isDeleting);

  const filteredContacts = contacts.filter(
    (contact) => contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = (id) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      dispatch(deleteContact(id));
      Report.success(
        'Contact deleted',
        `Contact with name : "${contact.name}" was deleted`,
        'Okay',
      );
    }
  };

  const handleClearContacts = async () => {
    try {
      for (const contact of filteredContacts) {
        await dispatch(deleteContact(contact.id));
      }
      Report.success(
        'All contacts cleared',
        'The contacts were cleared',
        'Okay',
      );
    } catch (error) {
      Report.failure(
        'Failed to clear contacts',
        'An error occurred while clearing contacts',
        'Okay',
      );
    }
  };
  
  

  return (
    <div>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button
              onClick={() => handleDeleteContact(contact.id)}
              className={styles.deleteButton}
              disabled={isDeleting} 
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
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
