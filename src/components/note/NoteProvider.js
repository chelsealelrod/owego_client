import React, { useState } from "react";

export const NoteContext = React.createContext();

export const NoteProvider = (props) => {
  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    return fetch("http://localhost:8000/notes", {
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
      },
    })
      .then((response) => response.json())
      .then(setNotes);
  };

  const addNote = (note) => {
    return fetch("http://localhost:8000/notes", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }).then((res) => res.json());
  };

  const deleteNote = (note_id) => {
    return fetch(`http://localhost:8000/notes/${note_id}`, {
      method: "DELETE",
    }).then(getNotes);
  };

  const editNotes = (note) => {
    return fetch(`http://localhost:8000/notes/${note.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };
  
const getNoteByBillId = (billId) => {
    return fetch(`http://localhost:8000/notes?billId=${billId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("cs_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setRelatedNotes);
  };

      
  return (
    <NoteContext.Provider
      value={{
        notes,
        getNotes,
        deleteNote,
        addNote,
        editNotes,
        getNoteByBillId
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};