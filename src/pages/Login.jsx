import { useState } from 'react'
import { useNavigate } from 'react-router'
import { userService } from '../services/user'
import { login } from '../store/actions/user.actions'

export function Login() {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const navigate = useNavigate()

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username || !credentials.password) return
        await login(credentials)
        navigate('/board')
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    return (
        <section className='login-container'>
            <h1 className="login-title">Log in to your account</h1>
            <form className="login-form" onSubmit={onLogin}>
                <label htmlFor="username">Enter your username</label>
                <input
                    type="text"
                    id='username'
                    name='username'
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Enter your password</label>
                <input
                    type="password"
                    id='password'
                    name='password'
                    onChange={handleChange}
                    required
                />
                {/* <select
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}>
                    <option value="">Select User</option>
                    {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
                </select> */}
                <button>
                    <span>Next</span>
                    <i className="fa-regular fa-arrow-right icon"></i>
                </button>
            </form>
        </section>
    )
}