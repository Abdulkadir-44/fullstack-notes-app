import {get} from "./request"

export const getAllNotes = ()=>get(`${import.meta.env.VITE_REACT_API_URL}/api/notes/get-all-notes`)