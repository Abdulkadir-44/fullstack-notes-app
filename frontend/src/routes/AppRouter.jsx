import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/Login';
import Home from '../pages/Home/Home';
import SignUp from '../pages/SignUp';
import { jwtDecode } from "jwt-decode"
import store from '@/redux/store';
import { userLogout } from "../redux/userSlice"
export const AppRouter = () => {
    const user = useSelector((state) => state.user.user);
    let logoutTimer;

    const startLogoutTimer = (expiresIn) => {
        // Oturumun süresi dolunca otomatik olarak çıkış yap
        logoutTimer = setTimeout(() => {
            store.dispatch(userLogout());
        }, expiresIn * 1000); // expiresIn saniye cinsinden olduğu için 1000 ile çarpılır
    };

    const clearLogoutTimer = () => {
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };
    useEffect(() => {
        
        const token = user?.accesToken;
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            const expiresIn = decodedToken.exp - currentTime;
            startLogoutTimer(expiresIn);
        }

        return () => {
            clearLogoutTimer();
        };
    }, [user]);
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
