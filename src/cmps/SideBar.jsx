import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BoardSideBarPreview } from "./BoardSideBarPreview";

import { GoHome } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";


import { loadBoards } from '../store/actions/board.actions'
import { AddBtnSideBar } from "./buttons/AddBtnSideBar.jsx";

export function SideBar() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())
    const [isOpen, toggleIsOpen] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        loadBoards(filterBy)
    }, [filterBy])

    return (
        <article className={isOpen ? "side-bar-container open Figtree-regular" : "side-bar-container close Figtree-regular"}>
            <div className="toggle-open hidden" onClick={() => toggleIsOpen(!isOpen)}>
                <span className="arrow">
                    {isOpen === true ? <SlArrowLeft size={12} className="icon"/> : <SlArrowRight size={12}  className="icon"/>}
                </span>
            </div>
            <nav>
                <div className="home-link" onClick={() => navigate('/board')}>
                    <GoHome size={20} />
                    <span>Home</span>
                </div>

                <div className="border"></div>

                <div className="favorites">
                    <GoStar size={20} />
                    <span>Favorites</span>
                </div>

                <div className="border"></div>

                <div className="ws-cmp Figtree-bold">
                    <span className="ws-icon">M</span>
                    <div>My Workspace</div>
                </div>

                <div className="search-add">
                    <div className="search-container">
                        <div><HiMagnifyingGlass /></div>
                        <input id="txt" onChange={(ev) => handleChange(ev, 'filter')} autoFocus name="txt" type="text" placeholder="Search" />
                    </div>
                    < AddBtnSideBar />
                </div>

                <ul className="board-list-side-bar">
                    {boards.filter(board => board.archivedAt === null).map((board) => (
                        <li key={board._id} className='board-side-bar-preview'>
                            <BoardSideBarPreview board={board} />
                        </li>
                    ))}
                </ul>
            </nav>
        </article>
    )
}