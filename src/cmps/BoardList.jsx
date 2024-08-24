import { useState } from 'react';
import { BoardPreview } from './BoardPreview'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


export function BoardList({ boards }) {
    const [isListOpen, setIsListOpen] = useState(true)

    return (
        <section>
            <div className="recently-visited Figtree-bold">
                <span className="arrow-down-icon" onClick={() => setIsListOpen(!isListOpen)}>
                    {isListOpen &&
                        <IoIosArrowUp /> ||
                        <IoIosArrowDown />
                    }
                </span>
                <h1>Recently visited</h1>
            </div>
            <ul className="board-list">
                {boards.map(board =>
                    <li key={board._id}>
                        {isListOpen &&
                            <BoardPreview board={board} />
                        }
                    </li>)
                }
            </ul>
        </section>
    )
}