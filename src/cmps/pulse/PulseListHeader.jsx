import { PulseSelector } from "./PulseSelector";

export function PulseListHeader({ group }) {

    return (
        <ul className="pulse-list-header">
            <div className="pulse-side-color" style={{ backgroundColor: group.style.color}}></div>

            <PulseSelector/>
            <li className="title-container">
                <span className="pulse-list-title">{group.type}</span>
            </li>
            {/* map on group cpm names/types as pulse headers */}
        </ul>
    )
}