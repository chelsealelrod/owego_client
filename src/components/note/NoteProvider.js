import React, { useState } from "react";

export const NoteContext = React.createContext();

export const NoteProvider = (props) => {
  const [notes, setNotes] = useState([]);
  const [billNotes, setRelatedBillNotes] = useState([]);

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
    }).then((res) => res.json())
    .then(getNoteByBillId);
  };

  const deleteNote = (id) => {
    return fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
        "Content-Type": "application/json",
      },
    }).then(getNotes);
  };

  const editNotes = note => {
    return fetch(`http://localhost:8000/notes/${note.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
    .then(getNotes);
  };
  
const getNoteByBillId = (billId) => {
    return fetch(`http://localhost:8000/notes?bill__id=${billId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setRelatedBillNotes);
  };

      
  return (
    <NoteContext.Provider
      value={{
        notes,
        getNotes,
        deleteNote,
        addNote,
        editNotes,
        getNoteByBillId,
        billNotes

      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};