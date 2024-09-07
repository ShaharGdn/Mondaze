import { PulseSelector } from "./PulseSelector"
import { PulseTitle } from "./PulseTitle"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { useSelector } from "react-redux"
import { removePulse, updatePulse } from "../../store/actions/selected-board.actions"
import { DynamicCmp } from "../dynamic-cmps/DynamicCmp"
import { useState } from "react"
import { ThreeDots } from "../buttons/ThreeDots"
import { AiOutlineDelete } from "react-icons/ai";
import { format } from "date-fns"
import { ICON_DATE } from "../icons/svg-icons"


export function PulsePreview({ group, pulse, type }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [open, setOpen] = useState(false)

    async function onRemovePulse() {
        try {
            await removePulse(board._id, group.id, pulse.id)
            showSuccessMsg('Pulse removed successfully')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot remove pulse')
        }
    }

    async function onUpdatePulse(pulseToUpdate) {
        try {
            await updatePulse(board._id, group.id, pulseToUpdate)
            showSuccessMsg('Pulse updated successfully')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot update pulse')
        }
    }

    const children = (
        <ul className="pulse-actions-list">
            <li className="delete-pulse" onClick={onRemovePulse}>
                <AiOutlineDelete className="icon" />
                <span>Delete {board.type}</span>
            </li>
        </ul>
    )

    return (
        <>
            {type === 'kanban' ? (
                <Kanban pulse={pulse} group={group} />
            ) : (
                <>
                    <div className="pulse-dots-wrapper">
                        <ThreeDots
                            children={children}
                            open={open}
                            setOpen={setOpen}
                            placement={'right-start'}
                            MainClassName={open ? 'pulse-dots-actions open' : 'pulse-dots-actions'}
                            type={'small'}
                        />
                    </div>


                    <ul className="pulse-preview">
                        <ul className="full-title-selector-container">
                            <div className="pulse-side-color" style={{ backgroundColor: group.style.color }}></div>
                            <PulseSelector group={group} />
                            <PulseTitle pulse={pulse} onUpdatePulse={onUpdatePulse} />
                        </ul>

                        {board.cmpsOrder.length > 0 &&
                            board.cmpsOrder.map((cmp, idx) => (
                                <li className="pulse-dynamic-container" key={idx}>
                                    <DynamicCmp cmp={cmp} onUpdatePulse={onUpdatePulse} pulse={pulse} />
                                </li>
                            ))}
                    </ul>
                </>
            )}
        </>
    )
}

const Kanban = ({ pulse, group }) => {
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