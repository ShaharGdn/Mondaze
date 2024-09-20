import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { logout } from '../store/actions/user.actions'
import { LoggedinUser } from './LoggedinUser'
import { useState } from 'react'

export function AppHeader() {
	const loggedInUser = useSelector(storeState => storeState.userModule.user)
	const [open, setOpen] = useState(false)
	const navigate = useNavigate()

	async function onLogout() {
		try {
			if (loggedInUser?._id) await logout()
			setOpen(false)
			navigate('/')
		} catch (err) {
			console.log('Cannot logout');
		}
	}

	return (
		<header className="app-header full">
			<nav>
				<div className='logo-container' onClick={() => navigate('/')}>
					<img className='wm-logo' src="../src/assets/img/wm_favicon.png" alt="" />
					<span className='proj-name'>mondaze </span>
					<span className='wm-title'>work management</span>
				</div>
				<LoggedinUser
					loggedInUser={loggedInUser}
					onLogout={onLogout}
					setOpen={setOpen}
					open={open} />
			</nav>
		</header>
	)
}

