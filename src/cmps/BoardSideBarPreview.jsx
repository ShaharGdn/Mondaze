import { NavLink } from 'react-router-dom'
import BoardIcon from './icons/BoardIcon';
import { useState } from 'react';
import { BoardActionsList } from './popovers/BoardActionsList';
import { ThreeDots } from './buttons/ThreeDots';

export function BoardSideBarPreview({ board, type }) {
    const [anchorEl, setAnchorEl] = useState(null)

    function getLinkClassName({ isActive }) {
        return isActive ? `board-side-bar-link Figtree-regular active ${modalOpenClassName()}`
            : `board-side-bar-link Figtree-regular ${modalOpenClassName()}`

        function modalOpenClassName() {
            const className = anchorEl ? 'modal-open' : ''
            return className
        }
    }

    // function handleClick(event) {
    //     event.preventDefault()
    //     event.stopPropagation()
    //     setAnchorEl(event.currentTarget)
    // }

    return (
        <>
            <NavLink className={getLinkClassName} to={`/board/${board._id}`}>
                <div className="board-name">
                    <div className="board-name-title">
                        <div className="board-icon">
                            <BoardIcon />
                        </div>
                        <p>{board.title}</p>
                    </div>

                    <ThreeDots children={<BoardActionsList board={board}
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl} />}
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        className='board-dots-actions'
                        classNameContent='actions-list'
                    />
                </div>
            </NavLink>
        </>
    )
}