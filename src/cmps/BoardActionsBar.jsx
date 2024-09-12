import { AddPulseBtn } from "./buttons/AddPulseBtn";
import { ICON_HOME } from "./icons/svg-icons";
import { BoardFilter } from "./BoradFilter";

export function BoardActionsBar({ board, setDisplayType, displayType, filterBy, setFilterBy }) {
    return (
        <div className="board-details-header Figtree-regular">
            <nav className="display-types-container">
                <ul className="displays-list">
                    <li className={displayType === "main" ? "main-table active" : "main-table"}>
                        <ICON_HOME className="icon" />
                        <span onClick={() => setDisplayType("main")}>Main Table</span>
                    </li>
                    <li className={displayType === "kanban" ? "kanban active" : "kanban"}>
                        <span onClick={() => setDisplayType("kanban")}>Kanban</span>
                    </li>
                </ul>
            </nav>

            <section className="board-action-bar">
                <AddPulseBtn board={board} />
                <BoardFilter board={board} filterBy={filterBy} setFilterBy={setFilterBy} />
            </section>
        </div>
    )
}