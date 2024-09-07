import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { updateBoard } from "../../store/actions/board.actions";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";


export function BoardDetailsContent({ board }) {
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
        <div className="board-details-popover">
            <div className="board-title">
                <h3>{board.title}</h3>
                <div className="toggle-favorite" onClick={onFavoriteBoard}>
                    {boardToEdit.isStarred ?
                        <FaStar color="#ffcb00" size={19} /> :
                        <FaRegStar size={19} />}
                </div>
            </div>
            <p>Manage any type of project. Assign owners, set timelines and keep track of where your project stands.</p>
            <div>Board info</div>
        </div>
    );
}
