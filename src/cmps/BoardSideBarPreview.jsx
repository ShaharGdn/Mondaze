import { NavLink, useNavigate } from 'react-router-dom'
import { BsThreeDots } from "react-icons/bs";

export function BoardSideBarPreview({ board, type }) {
    const navigate = useNavigate()

    return (
        <NavLink className="board-side-bar-preview-link Figtree-regular">
            <div className="board-name">
                <div className="board-name-title">
                    <div className="board-icon">
                        <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" class="board-icon" label="Expand list"><path d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </div>
                    <p>{board.title}</p>
                </div>
                <BsThreeDots className="board-dots-actions" />
            </div>
        </NavLink>
    )
}