import { PulseSelector } from "./PulseSelector";

export function PulseListHeader({ board, group }) {

    return (
        <ul className="pulse-list-header">
            <div className="pulse-side-color" style={{ backgroundColor: group.style.color }}></div>

            <PulseSelector />
            <li className="title-container">
                <span className="pulse-list-title">{group.type}</span>
            </li>
            {board.cmpsOrder.length > 0 && board.cmpsOrder.map((cmp, idx) =>
                <li className="cmp-title-container" key={cmp + idx}>
                    <span className="pulse-list-title">{cmp}</span>
                </li>)
            }
        </ul>
    )
}