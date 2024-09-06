import { DynamicStatsCmp } from "./DynamicStatsCmp";

export function GroupStatsRow({ board, group }) {

    return (
        <ul className="full-stats-wrapper">
            <div className="sticky-horizontal-wrapper">
                <li className="blank-footer"></li>
            </div>

            <ul className="group-stats-container">
                {board.cmpsOrder.length > 0 && board.cmpsOrder.map((cmp, idx) =>
                    <li className="stats-wrapper" key={cmp + idx}>
                        <DynamicStatsCmp board={board} cmp={cmp} group={group} />
                    </li>
                )}
            </ul>
        </ul>
    )
}
