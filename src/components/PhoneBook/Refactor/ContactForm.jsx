import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveContact } from "../../../Redux/contactSlice";
import { nanoid } from "nanoid";

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const contacts = useSelector((state) => state.contacts.contacts);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "number") {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
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
    dispatch(saveContact(newContact));
    setName("");
    setNumber("");
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
      <button type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
