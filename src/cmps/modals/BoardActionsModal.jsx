import { Box, Popover } from '@mui/material';
import { LuPen } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { MdOutlineOpenInNew } from "react-icons/md";



export function BoardActionsModal({ board, anchorEl, setAnchorEl }) {
    function handleClose() {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (

        <Popover
            className={`pop-over-board-actions ${id} Figtree-regular`}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            PaperProps={{
                sx: {
                    ml: 2,
                },
            }}
        >
            <Box sx={{ p: 0 }} className="actions-list">
                <ul>
                    <li className="new-tab">
                        <MdOutlineOpenInNew className="icon" />
                        <span>Open Board in New Tab</span>
                    </li>
                    <div className="border"></div>
                    <li className="rename">
                        <LuPen className="icon" />
                        <span>Rename Board</span>
                    </li>
                    <li className="favorite">
                        <FaRegStar className="icon" />
                        <span>{board.isStarred ? 'Remove from ' : 'Add to '}favorites</span>
                    </li>
                    <li className="duplicate">
                        <HiOutlineDocumentDuplicate className="icon" />
                        <span>Duplicate Board</span>
                    </li>
                    <div className="border"></div>

                    <li className="delete">
                        <AiOutlineDelete className="icon" />
                        <span>Delete</span>
                    </li>
                    <li className="archive">
                        <BsArchive className="icon" />
                        <span>Archive</span>
                    </li>
                </ul>
            </Box>
        </Popover>
    )
}