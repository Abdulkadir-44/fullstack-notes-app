import {get,post,del,put} from "./request"

export const getAllNotes = ()=>get(`${import.meta.env.VITE_REACT_API_URL}/api/notes/get-all-notes`)
export const addNote = (data)=>post(`${import.meta.env.VITE_REACT_API_URL}/api/notes/add-note`,data)
export const deleteNote = (id) =>del(`${import.meta.env.VITE_REACT_API_URL}/api/notes/delete-note/${id}`)
export const editNote = (id,data)=> put(`${import.meta.env.VITE_REACT_API_URL}/api/notes/edit-note/${id}`,data)