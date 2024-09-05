import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header full">
			<nav onClick={() => navigate('/')}>
				<img className='wm-logo' src="../src/assets/img/wm_favicon.png" alt=""/>
				<span className='proj-name poppins-bold'>mondaze </span>
				<span className='wm-title poppins-extralight'>work management</span>
			</nav>
		</header>
	)
}

