import React, { useState } from 'react';
import styled from 'styled-components';

const NoteContainer = styled.div`
  background-color: ${(props) => (props.darkMode ? '#333' : '#fff')};
  color: ${(props) => (props.darkMode ? '#fff' : '#333')};
  padding: 16px;
  margin: 16px 0;
  border: 1px solid ${(props) => (props.darkMode ? '#444' : '#ccc')};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NoteText = styled.p`
  flex-grow: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const EditButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: #fff;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Note = ({ children, darkMode, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(children);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      onEdit(editedContent);
    }
  };

  return (
    <NoteContainer darkMode={darkMode}>
      {isEditing ? (
        <input
          type="text"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <NoteText>{children}</NoteText>
      )}
      <ButtonContainer>
        <EditButton onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</EditButton>
        <DeleteButton onClick={onDelete}>Delete</DeleteButton>
      </ButtonContainer>
    </NoteContainer>
  );
};

export default Note;
