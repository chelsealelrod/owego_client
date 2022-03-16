import React, { useState } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
      },
    })
      .then((response) => response.json())
      .then(setCategories);
  };

  const addCategory = (category) => {
    return fetch("http://localhost:8000/categories", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }).then((res) => res.json());
  };

  const deleteCategory = (category_id) => {
    return fetch(`http://localhost:8000/categories/${category_id}`, {
      method: "DELETE",
    }).then(getCategories);
  };

  const editCategories = (category) => {
    return fetch(`http://localhost:8000/categories/${category.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        deleteCategory,
        addCategory,
        editCategories,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};