import { ICON_LOGOUT } from "./icons/svg-icons.jsx"
import { Popover } from "./popovers/Popover.jsx"

export function LoggedinUser({ loggedInUser, onLogout, setOpen, open }) {

    const trigger = (
        <div className='loggedin-user'>
            <span className='username'>{loggedInUser?.fullname}</span>
            <img src={loggedInUser?.imgUrl} alt="" />
        </div>
    )

    return (
        <Popover trigger={trigger} open={open} setOpen={setOpen}>
            <div className="popover-logout" onClick={onLogout}>
                {ICON_LOGOUT}
                <span>Log out</span>
            </div>
        </Popover>
    )
}