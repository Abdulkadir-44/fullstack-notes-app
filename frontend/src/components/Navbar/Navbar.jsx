import React from 'react'
import { useSelector } from "react-redux"
const Navbar = () => {
    const user = useSelector(state => state.user.user)
   
    return (
        <nav className='w-full h-16 bg-[#6159E5] flex items-center justify-between px-8'>
            <div>
                <h2 className='text-xl font-semibold text-gray-100'>Notes App</h2>
            </div>
            {
                user && (
                    <>
                        <div>Searcbar</div>
                        <div>Kullanıcı bilgileri</div>
                    </>
                )
            }
        </nav>
    )
}

export default Navbar