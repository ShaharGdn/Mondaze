import { useSelector } from "react-redux";
import { addPulse, removePulse, updatePulse } from "../../store/actions/selected-board.actions.js";
import { PulseList } from "../pulse/PulseList.jsx";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js";
import { useEffect, useState } from "react";

export function GroupPreview({ group, onRemoveGroup, onUpdateGroup }) {
    const [stateGroup, setGroupInState] = useState(group)
    const board = useSelector(storeState => storeState.selectedBoardModule.board)

    function onUpdate() {
        const newTitle = prompt('Title?')
        const titleColor = prompt('Title Color?')

        const updatedGroup = { ...stateGroup, title: newTitle, style: { ...stateGroup.style, color: titleColor } }
        onUpdateGroup(updatedGroup)
    }

    async function onAddPulse() {
        const title = prompt('Title?')
        try {
            const pulse = {
                title,
            }
            const addedPulse = await addPulse(board._id, stateGroup.id, pulse)

            const updatedGroup = {
                ...stateGroup,
                pulses: [...stateGroup.pulses, addedPulse],
            }

            setGroupInState(updatedGroup)
            showSuccessMsg('Pulse added')

        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot add pulse')
        }
    }

    async function onUpdatePulse(pulseToUpdate) {
        try {
            const updatedPulse = await updatePulse(board._id, stateGroup.id, pulseToUpdate)
            const updatedPulses = stateGroup.pulses.filter(pulse => pulse.id === pulseToUpdate.id ? pulseToUpdate : pulse)

            const updatedGroup = {
                ...stateGroup,
                pulses: updatedPulses,
            }

            setGroupInState(updatedGroup)
            showSuccessMsg('Pulse updated successfully')

            return updatedPulse
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot update pulse')
        }
    }

    async function onRemovePulse(pulseId) {
        try {
            await removePulse(board._id, stateGroup.id, pulseId)
            const updatedPulses = stateGroup.pulses.filter(pulse => pulse.id !== pulseId)

            const updatedGroup = {
                ...stateGroup,
                pulses: updatedPulses,
            }

            setGroupInState(updatedGroup)
            showSuccessMsg('Pulse removed successfully')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot remove pulse')
        }
    }


    return (
        <section className="group-preview">
            <h2>{group.title}</h2>
            <button onClick={() => onRemoveGroup(stateGroup.id)}>Remove group</button>
            <button onClick={onUpdate}>Update group</button>
            <button onClick={onAddPulse}>Add {stateGroup.type}</button>
            <PulseList pulses={stateGroup.pulses} type={stateGroup.type} onRemovePulse={onRemovePulse} onUpdatePulse={onUpdatePulse} />
        </section >
    )
}