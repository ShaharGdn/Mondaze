import { useNavigate } from 'react-router-dom'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import BoardIcon from './icons/BoardIcon';


export function BoardPreview({ board, type }) {
    const navigate = useNavigate()

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
                {!board.isStarred && <FaStar color="#ffcb00" size={19} /> || <FaRegStar size={19} />}

            </div>

            <div className="board-path">
                <img className='wm-logo' src="../src/assets/img/wm_favicon.png" alt="Workspace Logo" />
                <p>work management {'>'} My Workspace</p>
            </div>
        </article>
    )
}