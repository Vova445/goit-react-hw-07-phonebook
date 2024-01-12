import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get('https://65a1012f600f49256fb0b0d3.mockapi.io/contacts');
  return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  const response = await axios.post('https://65a1012f600f49256fb0b0d3.mockapi.io/contacts', contact);
  return response.data;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
  await axios.delete(`https://65a1012f600f49256fb0b0d3.mockapi.io/contacts/${id}`);
  return id;
});


const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
      })
  },
});

export const { updateFilter } = contactsSlice.actions;
export default contactsSlice.reducer;