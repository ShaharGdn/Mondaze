import React from 'react'
import { Routes, Route, useLocation } from 'react-router'

import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex.jsx'

import { BoardDetails } from './pages/BoardDetails.jsx'

import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'

// import { Dashboard } from './pages/Dashboard.jsx'
import { SideBar } from './cmps/SideBar.jsx'

export function RootCmp() {
    const location = useLocation(); // Get the current route

    // Determine if the current path is the homepage
    const isHomePage = location.pathname === '/';
    const isLoginPage = location.pathname === '/login' || location.pathname === '/login/signup';

    return (
        <div className="main-container">
            {!isHomePage && !isLoginPage && <AppHeader />} {/* Render AppHeader only if not on the homepage */}
            {!isHomePage && !isLoginPage && <SideBar />}   {/* Render SideBar only if not on the homepage */}
            <UserMsg />

            <Routes>
                <Route path="" element={<HomePage />} />
                <Route path="board" element={<BoardIndex />} />
                <Route path="board/:boardId" element={<BoardDetails />} />
                <Route path="login" element={<LoginSignup />}>
                    <Route index element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>

                {/* <Route path="dashboard" element={<Dashboard />} /> */}
                <Route path="Kanban/:boardId" element={<BoardDetails />} />
            </Routes>
        </div>
    )
}


