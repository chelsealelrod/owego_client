import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { CategoryContext } from "./CategoryProvider"

export const CategoryForm = () => {
    
    const { getCategories, categories, setCategories, editCategories } = useContext(CategoryContext)
    const history = useHistory()
    const [theCategory, setTheCategory] = useState({label: ''})
    const [newCategory, setNewCategory] = useState({})

    const { categoryId } = useParams()

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        const theCategory = categories.find(category => category.id === parseInt(categoryId)) || {label: ''}
        setTheCategory(theCategory)
    }, [categories, categoryId])


    const handleControlledInputChange = (event) => {
        newCategory[event.target.name] = event.target.value
        setNewCategory(newCategory)
    }

    const handleSaveEdit = (e) => {
        e.preventDefault()

        editCategories({
            id: theCategory.id,
            label: newCategory.label
        }).then(() =>{
           history.push('/categories')
        })
    }

    return (
        <div className='category_edit'>
            <form className='category_edit_form'>
                <fieldset>
                    <div className="category_edit_form_group">
                            <label htmlFor="name">Category Name: </label>
                            <input type="text" name="label" required autoFocus className="catForm-control"
                                placeholder="Category label"
                                defaultValue={theCategory.label}
                                onChange={handleControlledInputChange}/>
                    </div>
                </fieldset>
            </form>
            <button className='category_edit--save' onClick={handleSaveEdit}>Save</button>
            <button className='category_edit--cancel' onClick={() => {history.push('/categories')}}>Cancel</button>
        </div>
    )
}