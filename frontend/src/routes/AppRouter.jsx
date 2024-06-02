import React from 'react';
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/Login';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';

export const AppRouter = () => {
    const user = useSelector((state) => state.user.user);

    return (
        <Routes>
            {user ? (
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </>
            ) : (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </>
            )}
        </Routes>
    );
};
