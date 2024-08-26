import { PulseSelector } from "./PulseSelector"
import { PulseTitle } from "./PulseTitle"
import { showSuccessMsg } from "../../services/event-bus.service"
import { useSelector } from "react-redux"
import { removePulse, updatePulse } from "../../store/actions/selected-board.actions"

export function PulsePreview({ group, pulse }) {
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

    async function onUpdatePulse(title) {
        try {
            const pulseToUpdate = { ...pulse, title }
            await updatePulse(board._id, group.id, pulseToUpdate)
            showSuccessMsg('Pulse updated successfully')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot update pulse')
        }
    }

    return (
        <ul className="pulse-preview">
            <div className="pulse-side-color" style={{ backgroundColor: group.style.color }}></div>
            <div className="full-title-selector-container">
                <PulseSelector group={group} />
                <PulseTitle pulse={pulse} onUpdatePulse={onUpdatePulse} />
            </div>
            <button onClick={onRemovePulse}>Remove {group.type}</button>
        </ul >
    )
}