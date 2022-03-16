import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);

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
    }).then((res) => res.json());
  };

  const deleteTag = (category_id) => {
    return fetch(`http://localhost:8000/categories/${tag_id}`, {
      method: "DELETE",
    }).then(getTags);
  };

  const editTags = (tag) => {
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        getTags,
        deleteTag,
        addTag,
        editTags,
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};