import {post} from "./request"

export const loginPost = (data)=>post(`${import.meta.env.VITE_REACT_API_URL}/api/auth/login`,data)