import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag ] = useState({})

  const getTags = () => {
    return fetch("http://localhost:8000/tags", {
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
      },
    })
      .then((response) => response.json())
      .then(setTags);
  };

  const addTag = (tag) => {
    return fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    }).then((response) => response.json()).then(getTags);
  };

  const deleteTagById = (id) => {
    return fetch(`http://localhost:8000/tags/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("owegouser_id")}`
      }
    }).then(getTags);
  };

  const editTagById = tag => {
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag)
    })
      .then(getTags);
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        getTags,
        deleteTagById,
        addTag,
        editTagById,
        tag,
        setTag
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};