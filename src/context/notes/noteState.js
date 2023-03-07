import React, { useState } from "react";
// import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props)=>{
    const host = "https://inotebook-api-e9qe.onrender.com"
     
    const notesInitial = [{}]
    const [notes, setNotes] = useState(notesInitial);

    //Get all Notes
    const getNotes = async ()=>{
        //API Call
        const response = await fetch(`https://inotebook-api-e9qe.onrender.com/api/notes/fetchallnotes`, {
           method: "GET", 
           headers: {
             "Content-Type": "application/json",
             "auth-token": localStorage.getItem('token')
           }
         });
        const json = await response.json();
           console.log(json)
           setNotes(json)
         
         .catch(function(err){
          console.log("ye sab error")
          console.log(err);
         })
       }

    // Add a Note
    const addNote = async (title, description, tag)=>{
     //API Call
     const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}),
      });
      const note = await response.json(); 
      console.log(note)
      setNotes(notes.concat(note))
    }
    // Delete a Note
    const deleteNote = async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json(); 
      console.log(json)

      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }

    //Edit a Note
    const editNote = async (id, title, description, tag)=>{
      //API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}),
      });
      const json = await response.json(); 
      console.log(json)

      let newNotes = JSON.parse(JSON.stringify(notes))
      // logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id=== id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag; 
          break;                    
        }
      }
      setNotes(newNotes)
    }
    
      
     return (
        <noteContext.Provider value={{notes , addNote , deleteNote , getNotes , editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;
