import { format } from "date-fns"
import { ICON_DATE } from "./icons/svg-icons"

export function Kanban({ pulse, group }) {
    function formatDate() {
        if (!pulse.dueDate) return <></>

        const dateToShow = new Date(pulse.dueDate)
        const formattedDate = {
            day: format(dateToShow, 'd'),
            month: (format(dateToShow, 'MMMM')).substring(0, 3),
            year: format(dateToShow, 'yyyy'),
        }

        return (
            <>
                <ICON_DATE />
                {`${formattedDate.day} ${formattedDate.month}`}
            </>
        )
    }

    return (
        <div className="pulse-preview-kanban Figtree-regular">
            <div className="pulse-card">
                <span className="pulse-title" >{pulse.title}</span>
                <div className="status-date">
                    <span className={"pulse-status " + group.title}>
                        <div className={"side-color " + group.title}>
                        </div>
                        {group.title}
                    </span>
                    {/* <span>{pulse.priority}</span> */}
                    <span className="pulse-due-date">{formatDate()}</span>
                </div>
            </div>
        </div>
    )
}