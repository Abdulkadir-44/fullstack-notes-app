import React, { useState } from 'react'
import PasswordInput from '../components/PasswordInput'
import { loginPost } from "../services"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        loginPost({email,password})
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
        
    }
    return (
        <div className='login-page min-h-screen w-full flex justify-center items-center'>
            <div className='border border-gray-300 p-4 backdrop-blur-lg rounded'>
                <form onSubmit={handleSubmit}>
                    <h1 className='text-center text-3xl font-semibold mb-5 text-gray-100'>Login</h1>
                    <div className='flex items-center border-b  bg-transparent px-5 rounded my-6 text-white'>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className='input'
                            type="text"
                            name=""
                            id=""
                            placeholder='Email' />
                    </div>

                    <PasswordInput
                        value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <div className='text-center'>
                        <button
                            type='submit'
                            className='button'>
                            Giriş Yap
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login