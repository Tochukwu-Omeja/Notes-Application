import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Note from './Note';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.darkMode ? '#121212' : '#e3dbc4')};
    color: ${(props) => (props.darkMode ? '#fff' : '#333')};
    transition: background-color 0.5s, color 0.5s;
    margin: 0;
    font-family: 'Bookman Old Style', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
`;

const AppContainer = styled.div`
  text-align: center;
  padding: 40px;
  background-color: ${(props) => (props.darkMode ? '#1a1a1a' : '#fff')};
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.button`
  background-color: ${(props) => (props.darkMode ? '#333' : '#fff')};
  color: ${(props) => (props.darkMode ? '#fff' : '#333')};
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const NoteInput = styled.input`
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const editNote = (index, updatedContent) => {
    const newNotes = [...notes];
    newNotes[index] = updatedContent;
    setNotes(newNotes);
  };

  return (
    <>
      <GlobalStyle darkMode={darkMode} />
      <AppContainer darkMode={darkMode}>
        <div>
          <NoteInput
            type="text"
            placeholder="Type your note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
      <ToggleButton onClick={toggleDarkMode} darkMode={darkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </ToggleButton>
          <button onClick={addNote}>Add Note</button>
        </div>
        {notes.map((note, index) => (
          <Note
            key={index}
            darkMode={darkMode}
            onDelete={() => deleteNote(index)}
            onEdit={(content) => editNote(index, content)}
          >
            {note}
          </Note>
        ))}
      </AppContainer>
    </>
  );
};

export default App;