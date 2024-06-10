import React, { useState } from 'react'
import PasswordInput from '../components/Inputs/PasswordInput'
import { signUpPost } from "../services"
import { validateEmail } from "../utils/helper"
import { useNavigate, NavLink } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"
import { toast } from "sonner"
import Navbar from '../components/Navbar/Navbar'

const SignUp = () => {

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user.fullName) {
      setError("Lütfen Ad-Soyad girin !")
      return;
    }
    if (!validateEmail(user.email)) {
      setError("Lütfen geçerli bir mail girin !")
      return;
    }

    if (!user.password) {
      setError("Şifre zorunlu !")
      return;
    }

    setError('')
    setLoader(true)
    signUpPost(user)
      .then(data => {
        setLoader(false)
        console.log(data);
        toast.success(data.message)
        navigate("/login", { replace: true })
      })
      .catch(err => {
        setLoader(false)
        toast.error(err.message)
        console.log(err);
      })


  }
  return (
    <>

      {/* <Toaster
        duration={2000}
        position='top-center'
        closeButton
        richColors /> */}
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='bg-gradient-to-r from-indigo-500 to-purple-500 flex-1 flex justify-center items-center '>
          <div className='border border-slate-400  p-4 backdrop-blur-lg rounded md:w-[50%] md:flex md:flex-col md:items-center '>
            <form className='md:w-[80%] ' onSubmit={handleSubmit}>
              <h1 className='text-center text-3xl font-semibold mb-5 md:text-4xl text-gray-100'>Sign Up</h1>

              <div className='flex items-center border-b  bg-transparent px-5 rounded my-6 text-white font-semibold'>
                <input
                  name='fullName'
                  value={user.fullName}
                  onChange={handleChange}
                  className='input'
                  type="text"
                  // name=""
                  // id=""
                  placeholder='Ad Soyad' />
              </div>

              <div className='flex items-center border-b  bg-transparent px-5 rounded my-6 text-white font-semibold'>
                <input
                  name='email'
                  value={user.email}
                  onChange={handleChange}
                  className='input'
                  type="text"
                  // name=""
                  // id=""
                  placeholder='Email' />
              </div>

              <PasswordInput
                name="password"
                placeholder="Şifre"
                value={user.password}
                onChange={handleChange} />

              {error && <div className='text-red-400 font-semibold text-xs md:text-sm text-center'>{error}</div>}

              <div className='text-center'>
                <button
                  aria-label='Kayıt'
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
                      <span>Kayıt Ol</span>
                    )
                  }
                </button>
              </div>
              <div className='flex gap-x-4  md:text-base items-center justify-center text-white md:justify-start '>
                <p className='text-sm md:text-base'>Bir hesabınız var mı ?</p>
                <NavLink
                  className="underline underline-offset-2 text-indigo-900 "
                  to="/login">
                  Giriş Yap
                </NavLink>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp