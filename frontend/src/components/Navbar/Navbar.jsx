import React from 'react'
import { useSelector } from "react-redux"
import SearchBar from '../Inputs/SearchBar'
import ProfileInfo from '../Profile/ProfileInfo'

const Navbar = ({ value, onChange, onClearSearch }) => {
    const user = useSelector(state => state.user.user)

    return (
        <nav className='w-full  h-16 bg-gradient-to-r from-purple-600 to-indigo-600  flex items-center justify-between px-8'>
            <div>
                <h2 className='text-xl font-semibold text-gray-100'>Notes App</h2>
            </div>
            {
                user && (
                    <>
                        <div className='md:block hidden'>
                            <SearchBar value={value} onChange={onChange} oncClearSearch={onClearSearch} />
                        </div>
                        <div>
                            <ProfileInfo />
                        </div>
                    </>
                )
            }
        </nav>
    )
}

export default Navbar