export function GroupStatsRow({board, group}) {

    return (
        <ul className="full-stats-wrapper">
            {/* test if li can be the sticky wrapper */}
            <div className="sticky-horizontal-wrapper">
                <li className="empty-stats"></li>
            </div>

            <ul className="group-stats-container">
                {board.cmpsOrder.length > 0 && board.cmpsOrder.map((cmp, idx) =>
                    <li className="cmp-stats-container" key={cmp + idx}>
                        {/* stats cmp here */}
                    </li>
                )}
            </ul>
        </ul>

    )

}

{/* <ul className="pulse-list-header">
<div className="sticky-horizontal-wrapper">
    <div className="pulse-side-color" style={{ backgroundColor: group.style.color }}></div>
    <PulseSelector />
    <li className="title-container">
        <span className="pulse-list-title">{group.type}</span>
    </li>
</div>

{board.cmpsOrder.length > 0 && board.cmpsOrder.map((cmp, idx) =>
    <li className="cmp-title-container" key={cmp + idx}>
        <span className="pulse-list-title">{getTitles(cmp)}</span>
    </li>
)}
</ul> */}