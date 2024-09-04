import { PulseSelector } from "./PulseSelector"
import { PulseTitle } from "./PulseTitle"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { useSelector } from "react-redux"
import { removePulse, updatePulse } from "../../store/actions/selected-board.actions"
import { DynamicCmp } from "../dynamic-cmps/DynamicCmp"

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

    async function onUpdatePulse(pulseToUpdate) {
        try {
            await updatePulse(board._id, group.id, pulseToUpdate)
            showSuccessMsg('Pulse updated successfully')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot update pulse')
        }
    }

    return (
        <ul className="pulse-preview">
            <ul className="full-title-selector-container">
            <div className="pulse-side-color" style={{ backgroundColor: group.style.color }}></div>
                <PulseSelector group={group} />
                <PulseTitle pulse={pulse} onUpdatePulse={onUpdatePulse} />
            </ul>

            {board.cmpsOrder.length > 0 && board.cmpsOrder.map((cmp, idx) =>
                <li className="pulse-dynamic-container" key={idx}>
                    <DynamicCmp
                        cmp={cmp}
                        onUpdatePulse={onUpdatePulse}
                        pulse={pulse}
                    />
                </li>
            )}

            <button onClick={onRemovePulse}>Remove {group.type}</button>
        </ul >
    )
}