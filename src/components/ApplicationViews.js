import React from "react"
import { Route } from "react-router-dom"
import { CategoryProvider } from "./category/CategoryProvider";
import { CategoryList } from "./category/CategoryList"
import { CategoryCreate } from "./category/CategoryCreate"
import { CategoryForm } from "./category/CategoryForm"
import { BillDetail } from './bill/BillDetail'
import { BillForm } from "./bill/BillForm"
import { BillList } from "./bill/BillList"
import { BillProvider } from "./bill/BillProvider"
import { NoteForm } from "./note/NoteForm"
import { NoteList } from "./note/NoteList"
import { NoteProvider } from "./note/NoteProvider"
import { TagList } from "./tag/TagList"
import { TagForm } from "./tag/TagForm"
import { TagProvider } from "./tag/TagProvider"
import { TagDetail } from "./tag/TagDetail"
// import { BillTag } from "./tag/BillTag"

export const ApplicationViews = () => {
    return (
      <>
        <main
          style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem",
          }}
        >
          <BillProvider>
            <CategoryProvider>
                  <NoteProvider>
                    <TagProvider>
              <Route exact path="/categories">
                <CategoryList />
              </Route>
  

  
              <Route path='/categories/edit/:categoryId(\d+)'>
                  <CategoryForm />
              </Route>
  
              <Route path='/categories/create'>
                <CategoryCreate />
              </Route> 
  
  
              <Route exact path='/bills/create'>
                <BillForm />
              </Route>
  
              <Route path='/bills/edit/:billId(\d+)'>
                <BillForm />
              </Route>
  
              <Route path='/bills/view/:billId(\d+)'>
                <BillDetail />
              </Route>
  
  
              <Route exact path="/">
                <BillList />
              </Route>
  
              <Route exact path="/bills">
                <BillList />
              </Route>

              <Route exact path="/notes">
                <NoteList />
              </Route>

              <Route path='/notes/edit/:noteId(\d+)'>
                  <NoteForm />
              </Route> 
              
              <Route exact path='/tags'>
                  <TagList />
              </Route>

           
              <Route path='/tags/create'>
                  <TagDetail />
              </Route>
              <Route path='/tags/edit/:tagId(\d+)'>
                  <TagForm />
              </Route> 
                    </TagProvider>
                </NoteProvider>
            </CategoryProvider>
          </BillProvider>
        </main>
      </>
    );
  };
  