import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BoardSideBarPreview } from "./BoardSideBarPreview";

import { GoHome } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import { loadBoards } from '../store/actions/board.actions'
import { AddBtnSideBar } from "./buttons/AddBtnSideBar.jsx";
import { FaStar } from "react-icons/fa6";

export function SideBar() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [favoritesOpen, setFavoritesOpen] = useState(false)
    const [isOpen, toggleIsOpen] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth
          if (width < 581) {
            toggleIsOpen(false)
          }
        }
        window.addEventListener('resize', handleResize)
        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }, [])


    useEffect(() => {
        loadBoards()
    }, [])

    return (
        <article className={isOpen ? "side-bar-container open Figtree-regular" : "side-bar-container close Figtree-regular"}>
            <div className="toggle-open hidden" onClick={() => toggleIsOpen(!isOpen)}>
                <span className="arrow">
                    {isOpen === true ? <SlArrowLeft size={12} className="icon" />
                        : <SlArrowRight size={12} className="icon" />}
                </span>
            </div>
            <nav>
                <div className="home-link" onClick={() => navigate('/board')}>
                    <GoHome size={20} />
                    <span>Home</span>
                </div>

                <div className="border"></div>

                <div className="favorites-container">
                    <div
                        className={favoritesOpen ? "favorites open" : "favorites"}
                        onClick={() => setFavoritesOpen((prev) => !prev)}>
                        {favoritesOpen ? <FaStar color="#ffcb00" size={19} /> : <GoStar size={20} />}
                        <span>Favorites</span>
                        {favoritesOpen ? <IoIosArrowUp className="icon up" />
                            : <IoIosArrowDown className="icon down" />}
                    </div>
                    {/* favoritesList */}
                    {favoritesOpen &&
                        <div className="board-list-side-bar favorites-list">
                            {boards.filter(board => board.archivedAt === null && board.isStarred).length > 0 ? (
                                boards.filter(board => board.archivedAt === null && board.isStarred).map((board) => (
                                    <li key={board._id} className='board-side-bar-preview'>
                                        <BoardSideBarPreview board={board} />
                                    </li>
                                ))
                            ) : (
                                <div className="no-boards-message">
                                    <img src="/src/assets/img/favorites-no-bg.gif" alt="star" />
                                    <p className="title-empty">No favorite boards yet</p>
                                    <span className="title-empty">"Star" any board so that you can easily access it later</span>
                                </div>
                            )}
                        </div>
                    }
                </div>

                {favoritesOpen ? <div></div> : <div className="border"></div>}

                <div className={favoritesOpen ? "ws-cmp closed" : "ws-cmp Figtree-bold"}>
                    <span className="ws-icon">M</span>
                    <div>My Workspace</div>
                </div>

                <div className={favoritesOpen ? "search-add closed" : "search-add"}>
                    <div className="search-container">
                        <div><HiMagnifyingGlass /></div>
                        <input id="txt" onChange={(ev) => handleChange(ev, 'filter')} autoFocus name="txt" type="text" placeholder="Search" />
                    </div>
                    < AddBtnSideBar />
                </div>

                <ul className={favoritesOpen ? "board-list-side-bar closed" : "board-list-side-bar"}>
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