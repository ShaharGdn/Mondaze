import { PulseSelector } from "./PulseSelector";

export function PulseListHeader({type}) {


    return (
        <ul className="pulse-list-header">
            <PulseSelector />
            <li className="title-container">
                <span className="pulse-list-title">{type}</span>
            </li>
            {/* map on group cpm names/types as pulse headers */}
        </ul>
    )
}