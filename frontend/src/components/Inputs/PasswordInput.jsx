import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
const PasswordInput = ({ value, onChange, placeholder, name }) => {

    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    return (
        <div className='flex items-center border-b  bg-transparent px-5 rounded my-6  font-semibold'>
            <input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder || "Password"}
                type={isShowPassword ? 'text' : 'password'}
                className='input' />
            {
                isShowPassword ? (
                    <FaRegEye
                        size={20}
                        className='text-white ml-3 cursor-pointer'
                        onClick={() => toggleShowPassword()} />
                )
                    : <FaRegEyeSlash
                        size={20}
                        className='text-white ml-3 cursor-pointer'
                        onClick={() => toggleShowPassword()} />
            }

        </div>
    )
}

export default PasswordInput