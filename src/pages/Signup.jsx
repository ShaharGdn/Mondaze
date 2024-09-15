import { useState } from 'react'
import { useNavigate } from 'react-router'

import { signup } from '../store/actions/user.actions'

import { ImgUploader } from '../cmps/ImgUploader'
import { userService } from '../services/user'

export function Signup() {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const navigate = useNavigate()

    function clearState() {
        setCredentials(userService.getEmptyUser())
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username || !credentials.password || !credentials.fullname) return
        await signup(credentials)
        clearState()
        navigate('/board')
    }

    // function onUploaded(imgUrl) {
    //     setCredentials({ ...credentials, imgUrl })
    // }

    return (
        <section className='login-container'>
            <h1 className="login-title">Welcome to mondaze.com</h1>
            <form className="signup-form" onSubmit={onSignup}>
                <label htmlFor="fullname">Enter your full name</label>
                <input
                    id='fullname'
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="username">Enter your username</label>
                <input
                    id='username'
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Enter your password</label>
                <input
                    id='password'
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                {/* <ImgUploader onUploaded={onUploaded} /> */}
                <button>Signup</button>
            </form>
        </section>
    )
}