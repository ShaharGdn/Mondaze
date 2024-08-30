import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { addBoard, removeBoard, updateBoard } from '../../store/actions/board.actions';
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service';

// Icons
import { LuPen } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { MdOutlineOpenInNew } from "react-icons/md";

export function BoardActionsList({ board, anchorEl, setAnchorEl }) {
    const [boardToEdit, setBoardToEdit] = useState(board)

    useEffect(() => {
        setBoardToEdit({ ...board })
    }, [board])

    const navigate = useNavigate()

    async function onUpdateBoard(boardToUpdate) {
        console.log('boardToUpdate:', boardToUpdate)
        try {
            const board = await updateBoard(boardToUpdate)
            setBoardToEdit({ ...board })
            showSuccessMsg('Board Updated Successfully')
        } catch (err) {
            console.log('err: Cannot Update board', err)
            showErrorMsg('Cannot Update Board')
        } finally {
            setAnchorEl(null)
        }
    }

    async function onDeleteBoard() {
        try {
            await removeBoard(boardToEdit._id)
            showSuccessMsg('Board Deleted Successfully')
            navigate(`/board`)
        } catch (err) {
            console.log('err: Cannot delete board', err)
            showErrorMsg('Cannot Delete Board')
        } finally {
            setAnchorEl(null)
        }
    }

    async function onDuplicateBoard() {
        try {
            const newBoard = { ...boardToEdit }
            delete newBoard._id
            await addBoard(newBoard)
            showSuccessMsg('Board Duplicated Successfully')
        } catch (err) {
            console.log('err: Cannot Duplicated board', err)
            showErrorMsg('Cannot Duplicated Board')
        } finally {
            setAnchorEl(null)
        }
    }

    function onOpenNewTab() {
        const url = `/board/${boardToEdit._id}`;
        window.open(url, '_blank')
    }


    function onFavoriteBoard() {
        handleChange({
            prop: 'isStarred',
            value: boardToEdit.isStarred ? false : true
        })
    }

    function onArchiveBoard() {
        handleChange({
            prop: 'archivedAt',
            value: new Date()
        })
    }

    function handleChange({ prop, value }) {
        const boardToUpdate = {
            ...boardToEdit, [prop]: value
        }
        onUpdateBoard(boardToUpdate)
        setAnchorEl(null)
    }

    function handleClose(event) {
        event.preventDefault()
        event.stopPropagation()
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <ul>
            <li className="new-tab" onClick={onOpenNewTab}>
                <MdOutlineOpenInNew className="icon" />
                <span>Open Board in New Tab</span>
            </li>

            <div className="border"></div>
            <li className="rename">
                <LuPen className="icon" />
                <span>Rename Board</span>
            </li>

            <li className="favorite" onClick={onFavoriteBoard}>
                <FaRegStar className="icon" />
                <span>{board.isStarred ? 'Remove from ' : 'Add to '}favorites</span>
            </li>

            <li className="duplicate" onClick={onDuplicateBoard}>
                <HiOutlineDocumentDuplicate className="icon" />
                <span>Duplicate Board</span>
            </li>

            <div className="border"></div>

            <li className="delete" onClick={onDeleteBoard}>
                <AiOutlineDelete className="icon" />
                <span>Delete</span>
            </li>

            <li className="archive" onClick={onArchiveBoard}>
                <BsArchive className="icon" />
                <span>Archive</span>
            </li>
        </ul>
    )
}