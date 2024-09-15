import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'


export function LoginSignup() {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)

    return (
        <section className="login-page-container full">
            <header className="header">
                <img src="../src/assets/img/mondaze-logo.png" alt="" className="logo" onClick={() => navigate('/board')} />
            </header>
            <div className="login-page">
                <Outlet />
                <nav className='login-separator'>
                    <span className='separator-line'></span>
                    {!isLogin && <h2>Or Log in with </h2>}
                    {isLogin && <h2>Or Sign in with </h2>}
                    <span className='separator-line'></span>
                </nav>
                <div className='account-ref'>
                    {!isLogin &&
                        <span>Already have an account?
                            <NavLink to="." onClick={() => setIsLogin(true)}> Login</NavLink>
                        </span>}
                    {isLogin &&
                        <span>Don't have an account yet?
                            <NavLink to="signup" onClick={() => setIsLogin(false)}> Sign up</NavLink>
                        </span>}
                </div>
            </div>
        </section >
    )
}
