import { useNavigate } from 'react-router-dom'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import BoardIcon from './icons/BoardIcon';
import { useState } from 'react';
import { updateBoard } from '../store/actions/board.actions';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'


export function BoardPreview({ board, type }) {
    const navigate = useNavigate()
    const [boardToEdit, setBoardToEdit] = useState(board)

    async function onUpdateBoard(boardToUpdate) {
        try {
            const board = await updateBoard(boardToUpdate)
            setBoardToEdit({ ...board })
            showSuccessMsg('Board Updated Successfully')
        } catch (err) {
            console.log('err: Cannot Update board', err)
            showErrorMsg('Cannot Update Board')
        }
    }

    function onFavoriteBoard(event) {
        event.preventDefault()
        event.stopPropagation()

        const boardToUpdate = {
            ...boardToEdit, 'isStarred': boardToEdit.isStarred ? false : true
        }
        onUpdateBoard(boardToUpdate)
    }

    return (
        <article className="board-preview" onClick={() => navigate(`/board/${board._id}`)}>
            <div className="board-preview-img-container">
                <img src="src/assets/img/recent_board_prv.svg" alt="board-preview" />
            </div>

            <div className="board-name-and-star Figtree-bold">
                <div className="board-name-title">
                    <div className="board-icon">
                        <BoardIcon />
                    </div>
                    <p>{board.title}</p>
                </div>
                <span className="favorite" onClick={onFavoriteBoard}>
                    {board.isStarred && <FaStar color="#ffcb00" size={19} /> || <FaRegStar size={19} />}
                </span>
            </div>

            <div className="board-path">
                <img className='wm-logo' src="../src/assets/img/wm_favicon.png" alt="Workspace Logo" />
                <p>work management {'>'} My Workspace</p>
            </div>
        </article>
    )
}