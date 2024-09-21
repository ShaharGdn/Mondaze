import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { BoardActionsList } from './popovers/BoardActionsList';
import { ThreeDots } from './buttons/ThreeDots';
import { BoardIcon } from './icons/svg-icons';

export function BoardSideBarPreview({ board, type }) {
    const [open, setOpen] = useState(false);

    function getLinkClassName({ isActive }) {
        return isActive ? `board-side-bar-link Figtree-regular active ${modalOpenClassName()}`
            : `board-side-bar-link Figtree-regular ${modalOpenClassName()}`

        function modalOpenClassName() {
            const className = open ? 'modal-open' : ''
            return className
        }
    }

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
                        open={open}
                        setOpen={setOpen} />}
                        open={open}
                        setOpen={setOpen}
                        MainClassName='board-dots-actions'
                        classNameContent='actions-list'
                        placement={'bottom-start'}
                    />
                </div>
            </NavLink>
        </>
    )
}