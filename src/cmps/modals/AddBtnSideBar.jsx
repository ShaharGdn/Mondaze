import { Popover, Box } from "@mui/material"
import { useState } from "react"
import BoardIcon from "../icons/BoardIcon"
import DashBoardIcon from "../icons/DashBoardIcon"
import FolderIcon from "../icons/FolderIcon"
import { MdKeyboardArrowRight } from "react-icons/md"
import { AddBoardModal } from "./AddBoardModal"

export function AddBtnSideBar() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [openModal, setOpenModal] = useState(false)

    function handleClick(event) {
        setAnchorEl(event.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null)
    }

    function handleOpenModal() {
        handleClose()
        setOpenModal(true)
    }

    function handleCloseModal() {
        setOpenModal(false)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <>
            <button className="add-board-btn" onClick={handleClick}>
                <i className="fa-regular fa-plus-large fa-lg"></i>
            </button>
            <Popover
                className="pop-over-add-board"
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        ml: 1,
                    },
                }}
            >
                <Box sx={{ p: 1 }} className="modal-select">
                    <h5 className="modal-add-title Figtree-regular">Add new</h5>
                    <ul className="add-items-list Figtree-regular">
                        <li className="add-board" onClick={handleOpenModal}>
                            <div className="title-icon">
                                <BoardIcon className="icon" />
                                <span>Board</span>
                            </div>
                            <MdKeyboardArrowRight className="icon" />
                        </li>
                        <li className="add-dash-board">
                            <div className="title-icon">
                                <DashBoardIcon className="icon" />
                                <span>DashBoard</span>
                            </div>
                            <MdKeyboardArrowRight className="icon" />
                        </li>
                        <li className="add-folder">
                            <div className="title-icon">
                                <FolderIcon className="icon" />
                                <span>Folder</span>
                            </div>
                            <MdKeyboardArrowRight className="icon" />
                        </li>
                    </ul>
                </Box>
            </Popover>
            <AddBoardModal open={openModal} onClose={handleCloseModal}/>
        </>
    )
}
