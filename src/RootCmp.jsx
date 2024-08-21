import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUs'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'

import { BoardDetails } from './pages/BoardDetails.jsx'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'

import { Dashboard } from './pages/Dashboard.jsx'
import { Kanban } from './pages/Kanban.jsx'
import { PulseDetails } from './pages/PulseDetails.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />

            <main>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="board" element={<BoardIndex />} />
                    <Route path="board/:boardId" element={<BoardDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="chat" element={<ChatApp />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>

                    <Route path="board/:boardId/pulse/:pulseId" element={<PulseDetails />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="Kanban" element={<Kanban />} />
                </Routes>
            </main>
        </div>
    )
}


