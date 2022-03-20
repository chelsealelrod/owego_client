import React, { useEffect, useContext, useState } from "react"
import { useHistory } from 'react-router-dom'
import { CategoryContext  } from "./CategoryProvider"
// import "./Categories.css"


export const CategoryList = () => { 
    const history = useHistory()
    const {getCategories, category, deleteCategory, categories } = useContext(CategoryContext)



    const handleDelete = (id) => {
        deleteCategory(id)
        .then(() => {
            const remainingCategories = categories.filter( category => category.id !== id )
            getCategories(remainingCategories)
        })
    }

    useEffect(() => {
        getCategories()
    }, [])

    

    return(
        <>
        <div className='categories'>
            <h2 className='categories_title'>Categories</h2>
            <button onClick={() => history.push("/categories/create")}>
                Create Category
            </button>
            <ul className='categories_list'>
                
                {
                categories.map(category => {
                    return (
                        <li>
                          {category.label}
                           <button className='categories_edit' 
                          onClick={() => {history.push(`/categories/edit/${category.id}`)}}>__Edit</button>
                          <button onClick={() => {handleDelete(category.id)}}>__Delete</button>
                        </li>
                    )
                   
                })
                }
            </ul>
        
        </div>
    </>
    )
}