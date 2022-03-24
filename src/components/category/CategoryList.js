import React, { useEffect, useContext, useState } from "react"
import { useHistory } from 'react-router-dom'
import { CategoryContext  } from "./CategoryProvider"
import "./Category.css"


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
            <h1 className='categories_title'>Categories</h1>
            <button className="create-category-btn" onClick={() => history.push("/categories/create")}>
                Create Category
            </button>
            <ul className='categories_list' key={`category--${category?.id}`}>
                
                {
                categories.map(category => {
                    return (
                        <div className="category_container">
                        
                         <p className="category_label"> {category.label} </p>
                        
                        <button className="category-btn" 
                        onClick={() => {history.push(`/categories/edit/${category.id}`)}}>Edit</button>
                        <button className="category-btn" onClick={() => {handleDelete(category.id)}}>Delete</button>
                        </div>
                    )
                   
                })
                }
            </ul>
        
        </div>
    </>
    )
}