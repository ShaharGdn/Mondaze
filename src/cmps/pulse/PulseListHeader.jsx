import { PulseSelector } from "./PulseSelector";

export function PulseListHeader({ board, group }) {

    function getTitles(cmp) {
        switch (cmp) {
            case 'StatusPicker': return 'Status'
            case 'MemberPicker': return 'Assignee'
            case 'DatePicker': return 'Due Date'
            case 'PriorityPicker': return 'Priority'
            case 'TimeLinePicker': return 'Timeline'
            case 'FilesPicker': return 'Files'
            // add more as needed
            default: return ''
        }
    }

    return (
        <ul className="pulse-list-header">
            <div className="pulse-side-color" style={{ backgroundColor: group.style.color }}></div>

            <PulseSelector />
            <li className="title-container">
                <span className="pulse-list-title">{group.type}</span>
            </li>
            {board.cmpsOrder.length > 0 && board.cmpsOrder.map((cmp, idx) =>
                <li className="cmp-title-container" key={cmp + idx}>
                    {/* <span className="pulse-list-title">{cmp}</span> */}
                    <span className="pulse-list-title">{getTitles(cmp)}</span>
                </li>)
            }
        </ul>
    )
}