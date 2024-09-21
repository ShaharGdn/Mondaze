import { format } from "date-fns"
import { ICON_DATE } from "../icons/svg-icons"
import { useSelector } from "react-redux"

import empty_assignee from '../../assets/img/empty_assignee.svg'


export function PulsePreviewKanban({ pulse, group }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)

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


    function getMemberById(memberId) {
        return board.members.find(member => member._id === memberId)
    }

    const assignees = (
        <div className="assignee-container">
            <div className="multiple-img-container">
                {pulse.memberIds?.length >= 3 && (
                    <>
                        <img
                            className="assignee-img multiple"
                            src={getMemberById(pulse.memberIds[0]).imgUrl}
                            alt="" />
                        <div className="extra-members">+{pulse.memberIds.length - 1}</div>
                    </>
                )}
                {pulse.memberIds?.length > 0 && pulse.memberIds?.length < 3 && (
                    pulse.memberIds.map((memberId, idx) => {
                        return <img
                            className={`assignee-img${pulse.memberIds?.length <= 1 ? '' : ' multiple'}`}
                            key={idx}
                            src={getMemberById(memberId).imgUrl}
                            alt="" />
                    })
                )}
                {pulse.memberIds?.length === 0 && (
                    <img className="assignee-img" src={empty_assignee} alt="" />
                )}
            </div>
        </div>
    )

    return (
        <div className="pulse-preview-kanban Figtree-regular">
            <div className="pulse-card">
                <span className="pulse-title" >{pulse.title}</span>
                <div className="status-date">
                    {group.title.length > 0 && <span className={"pulse-status " + group.title}>
                        <div className={"side-color " + group.title}>
                        </div>
                        {group.title}
                    </span>}
                    {pulse.dueDate && <span className="pulse-due-date">{formatDate()}</span>}
                </div>
                <span className="assignees">{assignees}</span>
            </div>
        </div>
    )
}