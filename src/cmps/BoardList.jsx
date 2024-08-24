import { BoardPreview } from './BoardPreview'
import { IoIosArrowDown } from "react-icons/io";


export function BoardList({ boards }) {
    return <section className="">
    {/* return <section className="board-list-container"> */}
        <div className="recently-visited Figtree-bold">
            <span className="arrow-down-icon">
                <IoIosArrowDown />
            </span>
            <h1>Recently visited</h1>
        </div>
        <ul className="board-list">
            {boards.map(board =>
                <li key={board._id}>
                    <BoardPreview board={board} />
                </li>)
            }
        </ul>
    </section>
}