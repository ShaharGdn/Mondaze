import { useSelector } from "react-redux";
import { addPulse, removeGroup, updateGroup } from "../../store/actions/selected-board.actions.js";
import { PulseList } from "../pulse/PulseList.jsx";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js";
import { PulseListHeader } from "../pulse/PulseListHeader.jsx";
import { GroupTitleHeader } from "./GroupTitleHeader.jsx";
import { useState } from "react";

export function GroupPreview({ group }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [isGroupOpen, setIsGroupOpen] = useState(true)


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
        try {
            const pulse = {
                title: board.type,
                status: 'dft3488',
                priority: 'dft3489',
                isDone: '',
            }
            await addPulse(board._id, group.id, pulse)
            showSuccessMsg('Pulse added')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot add pulse')
        }
    }

    return (
        <section className="group-preview">
            <button onClick={() => onRemoveGroup(group.id)}>Remove group</button>
            <button onClick={onUpdateGroup}>Update group</button>
            <button onClick={onAddPulse}>Add {group.type}</button>

            <GroupTitleHeader group={group} isGroupOpen={isGroupOpen} setIsGroupOpen={setIsGroupOpen} />
            {isGroupOpen && 
            <>
                <PulseListHeader board={board} group={group} />
                <PulseList group={group} />
            </>
            }
            {/* <PulseListHeader board={board} group={group} />
            <PulseList group={group} /> */}
        </section >
    )
}