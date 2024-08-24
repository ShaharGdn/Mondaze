import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BoardSideBarPreview } from "./BoardSideBarPreview";

import { GoHome } from "react-icons/go";
import { GoStar } from "react-icons/go";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { loadBoards } from '../store/actions/board.actions'

export function SideBar() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())
    const navigate = useNavigate()

    useEffect(() => {
        loadBoards(filterBy)
    }, [filterBy])

    return (
        <article className="side-bar-container open Figtree-regular">
            <nav>
                <div className="home-link" onClick={() => navigate('/board')}>
                    <GoHome size={20} />
                    <span>Home</span>
                </div>

                <hr />

                <div className="favorites">
                    <GoStar size={20} />
                    <span>Favorites</span>
                </div>

                <hr />

                <div className="ws-cmp Figtree-bold">
                    <span className="ws-icon">M</span>
                    <div>My Workspace</div>
                </div>

                <div className="search-add">
                    <div className="search-container">
                        <div><HiMagnifyingGlass /></div>
                        <input id="txt" onChange={(ev) => handleChange(ev, 'filter')} autoFocus name="txt" type="text" placeholder="Search" />
                    </div>
                    <button className="add-board-btn">
                        <i class="fa-regular fa-plus-large fa-lg"></i>
                    </button>
                </div>

                <ul className="board-list-side-bar">
                    {boards.map(board =>
                        <li key={board._id} className="board-side-bar-preview"  onClick={() => navigate(`/board/${board._id}`)}>
                            <BoardSideBarPreview board={board} />
                        </li>)
                    }
                </ul>
            </nav>
        </article>
    )
}