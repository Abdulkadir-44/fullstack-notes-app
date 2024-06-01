import { post } from "./request"

export const signUpPost = (data) => post(`${import.meta.env.VITE_REACT_API_URL}/api/auth/register`, data)