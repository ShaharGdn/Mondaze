import { NavLink } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs';
import BoardIcon from './icons/BoardIcon';

export function BoardSideBarPreview({ board, type }) {
    function getClassName({ isActive }) {
        return isActive ? 'board-side-bar-link Figtree-regular active'
            : 'board-side-bar-link Figtree-regular'
    }

    return (
        <NavLink className={getClassName} to={`/board/${board._id}`}>
            <div className="board-name">
                <div className="board-name-title">
                    <div className="board-icon">
                        <BoardIcon />
                    </div>
                    <p>{board.title}</p>
                </div>
                <BsThreeDots className="board-dots-actions" />
            </div>
        </NavLink>
    )
}