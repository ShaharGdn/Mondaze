import { useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { addGroup, addPulse } from "../../store/actions/selected-board.actions"
import { PopoverNoArrow } from "../popovers/PopoverNoArrow"
import { ICON_GROUP } from "../icons/svg-icons"

export function AddPulseBtn({ board }) {
    const [open, setOpen] = useState(null)

    async function onAddPulse() {
        try {
            const pulse = {
                title: board.type,
                status: 'dft3488',
                priority: 'dft3489',
                isDone: '',
            }
            await addPulse(board._id, board.groups[0].id, pulse)
            showSuccessMsg('Pulse added')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot add pulse')
        }
    }

    async function onAddGroup() {
        try {
            setOpen(null)
            await addGroup(board._id, 'start')
            showSuccessMsg(`Group added`)
        } catch (err) {
            showErrorMsg('Cannot add group')
        }
    }

    const trigger = (
        <div className="ds-menu-button-container">
            <button type="button"
                className="add-group"
            >
                <i className="fa fa-angle-down">
                </i>
            </button>
        </div>
    )

    const children = (
        <div className="add-group-list" onClick={onAddGroup}>
            <ICON_GROUP className="icon" />
            <span>New group of {board.type.toLowerCase()}s</span>
        </div>
    )

    return (
        <div className="add-pulse-button-component">
            <div>
                <button
                    type="button"
                    className="add-pulse Figtree-thin"
                    onClick={onAddPulse}
                >
                    New task
                </button>
            </div>
            <PopoverNoArrow
                children={children}
                trigger={trigger}
                placement="bottom-start"
                open={open}
                setOpen={setOpen}
                classNameContent={"add-group-container"} />
        </div>
    )
}