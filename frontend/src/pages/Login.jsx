import React, { useState } from 'react'
import PasswordInput from '../components/PasswordInput'
import { loginPost } from "../services"
import { validateEmail } from "../utils/helper"
import { useDispatch } from "react-redux"
import { userLogin } from "../redux/userSlice"
import { useNavigate } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"
import { Toaster, toast } from "sonner"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateEmail(email)) {
            setError("Lütfen geçerli bir mail girin !")
            return;
        }

        if (!password) {
            setError("Şifre zorunlu")
            return;
        }

        setError('')
        setLoader(true)
        loginPost({ email, password })
            .then(data => {
                dispatch(userLogin(data))
                setLoader(false)
                toast.success(`Hoşgeldiniz ${data.userInfo.fullName}`)
                navigate("/")
            })
            .catch(err => {
                setLoader(false)
                toast.error(err.message)
                console.log(err);
            })


    }
    return (
        <>
            <Toaster
                duration={2000}
                position='top-center'
                closeButton
                richColors />
            <div className='login-page min-h-screen w-full flex justify-center items-center'>
                <div className='border border-gray-300 p-4 backdrop-blur-lg rounded'>
                    <form onSubmit={handleSubmit}>
                        <h1 className='text-center text-3xl font-semibold mb-5 text-gray-100'>Login</h1>
                        <div className='flex items-center border-b  bg-transparent px-5 rounded my-6 text-white font-semibold'>
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
                        {error && <div className='text-red-300 text-xs text-center'>{error}</div>}
                        <div className='text-center'>
                            <button
                                type='submit'
                                className='button flex justify-center items-center'>
                                {
                                    loader ? (
                                        <ThreeDots
                                            visible={true}
                                            height="24"
                                            width="24"
                                            color="white"
                                            radius="9"
                                            ariaLabel="three-dots-loading" />
                                    ) : (
                                        <span>Giriş Yap</span>
                                    )
                                }
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Login