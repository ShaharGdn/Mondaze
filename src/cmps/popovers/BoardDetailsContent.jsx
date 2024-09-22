import { FaRegStar, FaStar } from "react-icons/fa6";
import { updateBoard } from "../../store/actions/board.actions";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { useInputHandler } from "../../customHooks/useInputHandler";

import Shahar from '../../assets/img/shahar.jpg'
import Michal from '../../assets/img/michal.jpg'

export function BoardDetailsContent({ board }) {
    const [inputRef, setIsBlurred, propToEdit, setPropToEdit,
        handleBlur, handleSubmit, isEditable, setIsEditable] = useInputHandler(board.title, handleTitleChange)

    function handleTitleChange(updatedTitle) {
        const boardToUpdate = { ...board, title: updatedTitle }
        onUpdateBoard(boardToUpdate)
    }

    async function onUpdateBoard(boardToUpdate) {
        try {
            await updateBoard(boardToUpdate)
            showSuccessMsg('Board updated Successfully')
        } catch (err) {
            console.log('err: Cannot update board', err)
            showErrorMsg('Cannot update Board')
        }
    }

    function onFavoriteBoard(event) {
        event.preventDefault()
        event.stopPropagation()

        const boardToUpdate = {
            ...board, 'isStarred': !board.isStarred
        }
        onUpdateBoard(boardToUpdate)
    }
    return (
        <div className="board-details-popover">
            <div className="board-info-header">
                <form className="input-container" onSubmit={handleSubmit}>
                    {isEditable ? <input
                        className="board-title-input"
                        type="text"
                        value={propToEdit}
                        onChange={(ev) => setPropToEdit(ev.target.value)}
                        onBlur={() => handleBlur()}
                        onFocus={() => setIsBlurred(false)}
                        ref={inputRef}
                        autoFocus
                    /> : <h3 className="board-info-title" onClick={() => setIsEditable(true)}>{propToEdit}</h3>}
                </form>

                <div className="toggle-favorite" onClick={onFavoriteBoard}>
                    {board.isStarred ?
                        <FaStar color="#ffcb00" size={19} /> :
                        <FaRegStar size={19} />}
                </div>
            </div>
            <div className="board-info-main">
                <p>Manage any type of project. Assign owners, set timelines and keep track of where your project stands.</p>
                <h3>Board info</h3>
                <ul>
                    <li className="info-row">
                        <span>Board type</span>
                        <span>{board.type}</span>
                    </li>
                    <li className="info-row">
                        <span>Owner</span>
                        <div className="owners">
                            <div className="person">
                                <img src={Shahar} alt="" />
                                <span>Shahar Gadon</span>
                            </div>
                            <div className="person">
                                <img src={Michal} alt="" />
                                <span>Michal Rotkop</span>
                            </div>
                        </div>
                    </li>
                    <li className="info-row">
                        <span>Created By</span>
                        <div className="person">
                            <img src={board.createdBy.imgUrl} alt="" />
                            <span>{board.createdBy.fullname}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
