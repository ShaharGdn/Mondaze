import { useSelector } from "react-redux";
import { addPulse, removeGroup, removePulse, updateGroup, updatePulse } from "../../store/actions/selected-board.actions.js";
import { PulseList } from "../pulse/PulseList.jsx";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js";
import { PulseListHeader } from "../pulse/PulseListHeader.jsx";
import { GroupTitleHeader } from "./GroupTitleHeader.jsx";

export function GroupPreview({ group }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)

    async function onRemoveGroup() {
        try {
            await removeGroup(board._id, group.id)
            showSuccessMsg(`Group removed (id: ${group.id})`)
        } catch (err) {
            showErrorMsg('Cannot remove group')
        }
    }

    async function onUpdateGroup() {
        const newTitle = prompt('Title?')
        const titleColor = prompt('Title Color?')

        try {
            const updatedGroup = { ...group, title: newTitle, style: { ...group.style, color: titleColor } }
            await updateGroup(board._id, updatedGroup)
            showSuccessMsg(`Group updated (id: ${updatedGroup.id})`)
        } catch (err) {
            showErrorMsg('Cannot update group')
        }
    }

    async function onAddPulse() {
        const title = prompt('Title?')
        try {
            const pulse = {
                title,
            }
            const addedPulse = await addPulse(board._id, group.id, pulse)
            showSuccessMsg('Pulse added')

        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot add pulse')
        }
    }

    async function onUpdatePulse(pulseToUpdate) {
        try {
            const updatedPulse = await updatePulse(board._id, group.id, pulseToUpdate)
            showSuccessMsg('Pulse updated successfully')

            return updatedPulse
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot update pulse')
        }
    }

    async function onRemovePulse(pulseId) {
        try {
            await removePulse(board._id, group.id, pulseId)
            showSuccessMsg('Pulse removed successfully')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot remove pulse')
        }
    }

    return (
        <section className="group-preview">
            <button onClick={() => onRemoveGroup(group.id)}>Remove group</button>
            <button onClick={onUpdateGroup}>Update group</button>
            <button onClick={onAddPulse}>Add {group.type}</button>
            <GroupTitleHeader group={group} />
            <PulseListHeader type={group.type} />
            <PulseList pulses={group.pulses} type={group.type} onRemovePulse={onRemovePulse} onUpdatePulse={onUpdatePulse} />
        </section >
    )
}