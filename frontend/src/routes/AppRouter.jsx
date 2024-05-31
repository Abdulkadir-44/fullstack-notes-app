import React from 'react'
import { useSelector } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from '../pages/Login'
import Home from '../pages/Home'

export const AppRouter = () => {
    //Reduxtan kullanıcı alınır
    const user = useSelector((state) => state.user.user)

    if (!user)
        // kullanıcı yoksa login sayfası gösterilir
        return (
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<Navigate to="/login" />} />
            </Routes>
        )
    return (
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    )
}

