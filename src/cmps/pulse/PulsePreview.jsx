import { useState } from "react"
import { PulseSelector } from "./PulseSelector"
import { PulseTitle } from "./PulseTitle"
import { showSuccessMsg } from "../../services/event-bus.service"
import { useSelector } from "react-redux"
import { removePulse } from "../../store/actions/selected-board.actions"

export function PulsePreview({ group, pulse, onUpdatePulse }) {
    // const [pulseToEdit, setPulseToEdit] = useState(pulse)
    const board = useSelector(storeState => storeState.selectedBoardModule.board)

    async function onRemovePulse() {
        try {
            await removePulse(board._id, group.id, pulse.id)
            showSuccessMsg('Pulse removed successfully')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot remove pulse')
        }
    }

    async function handleChange() {
        try {
            const title = prompt('New title?')
            const newPulse = { ...pulse, title }

            await onUpdatePulse(newPulse)
            showSuccessMsg('Pulse updated successfully')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot update pulse')
        }
    }
    // async function handleChange() {
    //     try {
    //         const title = prompt('New title?')
    //         const newPulse = {
    //             ...pulseToEdit, title
    //         }
    //         const updatedPulse = await onUpdatePulse(newPulse)
    //         setPulseToEdit(updatedPulse)
    //     } catch (err) {
    //         console.log('err:', err)
    //     }
    // }

    return (
        <ul className="pulse-preview">
            <PulseSelector />
            <PulseTitle pulse={pulse} />
            <button onClick={onRemovePulse}>Remove {group.type}</button>
            {/* <button onClick={() => onRemovePulse(pulseToEdit.id)}>Remove {type}</button> */}
            <button onClick={handleChange}>Update {group.type}</button>
        </ul >
    )
}