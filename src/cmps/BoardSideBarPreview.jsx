import { NavLink } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs';
import BoardIcon from './icons/BoardIcon';
// import { Box, Popover } from '@mui/material';
import { useState } from 'react';
import { BoardActionsModal } from './modals/BoardActionsModal';

export function BoardSideBarPreview({ board, type }) {
    const [anchorEl, setAnchorEl] = useState(null)

    function getClassName({ isActive }) {
        return isActive ? 'board-side-bar-link Figtree-regular active'
            : 'board-side-bar-link Figtree-regular'
    }

    function handleClick(event) {
        event.preventDefault()
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    // function handleClose() {
    //     setAnchorEl(null)
    // }

    // const open = Boolean(anchorEl)
    // const id = open ? 'simple-popover' : undefined

    return (
        <>
            <NavLink className={getClassName} to={`/board/${board._id}`}>
                <div className="board-name">
                    <div className="board-name-title">
                        <div className="board-icon">
                            <BoardIcon />
                        </div>
                        <p>{board.title}</p>
                    </div>
                    <div className="board-dots-actions">
                        <BsThreeDots
                            onClick={handleClick}
                        />
                        <BoardActionsModal board={board} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                    </div>
                </div>
            </NavLink>
        </>
    )
}