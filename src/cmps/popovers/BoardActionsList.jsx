import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { addBoard, removeBoard, updateBoard } from '../../store/actions/board.actions'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

// Icons
import { LuPen } from "react-icons/lu"
import { FaRegStar } from "react-icons/fa"
import { HiOutlineDocumentDuplicate } from "react-icons/hi"
import { AiOutlineDelete } from "react-icons/ai"
import { BsArchive } from "react-icons/bs"
import { MdOutlineOpenInNew } from "react-icons/md"

export function BoardActionsList({ board, open, setOpen }) {
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
            setOpen(null)
        }
    }

    async function onDeleteBoard(event) {
        event.preventDefault()
        event.stopPropagation()
        try {
            await removeBoard(boardToEdit._id)
            showSuccessMsg('Board Deleted Successfully')
            navigate(`/board`)
        } catch (err) {
            console.log('err: Cannot delete board', err)
            showErrorMsg('Cannot Delete Board')
        } finally {
            setOpen(null)
        }
    }

    async function onDuplicateBoard(event) {
        event.preventDefault()
        event.stopPropagation()
        try {
            const newBoard = { ...boardToEdit }
            delete newBoard._id
            await addBoard(newBoard)
            showSuccessMsg('Board Duplicated Successfully')
        } catch (err) {
            console.log('err: Cannot Duplicated board', err)
            showErrorMsg('Cannot Duplicated Board')
        } finally {
            setOpen(null)
        }
    }

    function onOpenNewTab(event) {
        event.preventDefault()
        event.stopPropagation()
        const url = `/board/${boardToEdit._id}`
        window.open(url, '_blank')
    }


    function onFavoriteBoard(event) {
        event.preventDefault()
        event.stopPropagation()
        handleChange({
            prop: 'isStarred',
            value: boardToEdit.isStarred ? false : true
        })
    }

    function onArchiveBoard(event) {
        event.preventDefault()
        event.stopPropagation()
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
        setOpen(null)
    }

    function handleClose(event) {
        event.preventDefault()
        event.stopPropagation()
        setOpen(null)
    }

    const isOpen = Boolean(open)
    const id = isOpen ? 'simple-popover' : undefined

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