import {post} from "./request"

export const loginPost = (data)=>post("http://localhost:3000/api/auth/login",data)