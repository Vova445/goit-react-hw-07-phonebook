import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Phonebook.module.css";
import ContactForm from "./Refactor/ContactForm";
import Filter from "./Refactor/Filter";
import ContactList from "./Refactor/ContactList";
import { fetchContacts } from "../../Redux/contactSlice";

const Phonebook = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ContactList />
    </div>
  );
};

export default Phonebook;
