import Phonebook from './PhoneBook/Phonebook';
export const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        fontSize: 40,
        color: '#010101'
      }}
    >
      <Phonebook />
    </div>
  );
};