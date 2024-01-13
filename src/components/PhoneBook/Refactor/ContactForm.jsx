import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../../Redux/contactSlice";
import { nanoid } from "nanoid";
import { Report } from 'notiflix/build/notiflix-report-aio';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const isAdding = useSelector((state) => state.contacts.isAdding);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "number") {
      setNumber(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }
  
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
  
    try {
      await dispatch(addContact(newContact));
      Report.success(
        'Contact added',
        `Contact with name "${newContact.name}" was added`,
        'Okay',
      );
      setName("");
      setNumber("");
    } catch (error) {
      Report.failure(
        'Failed to add contact',
        'An error occurred while adding the contact',
        'Okay',
      );
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" name="name" value={name} onChange={handleInputChange} required />
      </label>
      <label>
        Number
        <input type="tel" name="number" value={number} onChange={handleInputChange} required />
      </label>
      <button type="submit" disabled={isAdding}>
        {isAdding ? 'Adding...' : 'Add Contact'}
      </button>
    </form>
  );
};

export default ContactForm;
