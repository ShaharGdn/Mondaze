import { useState } from "react";
import { AddPulseBtn } from "./buttons/AddPulseBtn";
import { EMPTY_PERSON, FILTER_ICON, ICON_HOME, ICON_SEARCH, ICON_SQUARE_CHART, SORT_ICON } from "./icons/svg-icons";

export function BoardActionsBar({ board }) {
    const [displayType, setDisplayType] = useState("main")

    return <div className="board-actions-bar Figtree-regular">
        <nav className="display-types-container">
            <ul className="displays-list">
                <li className={displayType === "main" ? "main-table active" : "main-table"}>
                    <ICON_HOME className="icon"/>
                    <span onClick={()=> setDisplayType("main")}>Main Table</span>
                </li>
                <li className={displayType === "kanban" ? "kanban active" : "kanban"}>
                    <span onClick={()=> setDisplayType("kanban")}>Kanban</span>
                </li>
            </ul>
        </nav>
        <div className="add-filter-sort-actions">
            <AddPulseBtn board={board} />
            <label htmlFor="search">
                <div className="search-container">
                    <ICON_SEARCH className="icon"/>
                    <span>Search</span>
                </div>
                <input type="search" id="search" className="search hidden" />
            </label>
            <div className="person-filter">
                <EMPTY_PERSON className="icon"/>
                <span>Person</span>
            </div>
            <div className="filter">
                <FILTER_ICON className="icon"/>
                <span>Filter</span>
            </div>
            <div className="sort">
                <SORT_ICON className="icon"/>
                <span>Sort</span>
            </div>
        </div>

    </div>
}