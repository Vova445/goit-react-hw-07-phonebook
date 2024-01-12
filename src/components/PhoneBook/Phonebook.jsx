import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Phonebook.module.css";
import ContactForm from "./Refactor/ContactForm";
import Filter from "./Refactor/Filter";
import ContactList from "./Refactor/ContactList";
import { saveContact } from "../../Redux/contactSlice";

const Phonebook = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (storedContacts) {
      dispatch(saveContact(storedContacts));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default Phonebook;
