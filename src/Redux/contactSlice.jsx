import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    saveContact: (state, action) => {
      const newContacts = Array.isArray(action.payload) ? action.payload : [action.payload];
      const nonEmptyContacts = newContacts
        .filter(contact => contact && contact.name && contact.number)
        .filter(contact => contact.name.trim() !== '' && contact.number.trim() !== '');

      if (nonEmptyContacts.length > 0) {
        state.contacts = [...state.contacts, ...nonEmptyContacts];
      }
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearContacts: (state) => {
      state.contacts = [];
    },
  },
});

export const { saveContact, deleteContact, updateFilter, clearContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
