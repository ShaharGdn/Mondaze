import { useState } from "react"
import { AddBoardModal } from "../popovers/AddBoardModal"
import { PopoverNoArrow } from "../popovers/PopoverNoArrow"

import BoardIcon from "../icons/BoardIcon"
import DashBoardIcon from "../icons/DashBoardIcon"
import FolderIcon from "../icons/FolderIcon"
import { MdKeyboardArrowRight } from "react-icons/md"

export function AddBtnSideBar() {
    const [open, setOpen] = useState(null)
    const [openModal, setOpenModal] = useState(false)

    function handleClick(event) {
        setOpen(open)
    }

    function handleClose() {
        setOpen(null)
    }

    function handleOpenModal() {
        handleClose()
        setOpenModal(true)
    }

    function handleCloseModal() {
        setOpenModal(false)
    }

    const isOpen = Boolean(open)
    const id = isOpen ? 'simple-popover' : undefined

    const children = (
        <div className="modal-select">
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
        </div >
    )

    const trigger = (
        <button className="add-board-btn" onClick={handleClick}>
            <i className="fa-regular fa-plus-large fa-lg"></i>
        </button>
    )

    return (
        <>
            <PopoverNoArrow
                open={open}
                setOpen={setOpen}
                children={children}
                placement={'right-start'}
                trigger={trigger}
                MainClassName={'pop-over-add-board'}
                className="pop-over-add-board"
            />
            <AddBoardModal open={openModal} onClose={handleCloseModal} />
        </>
    )
}
