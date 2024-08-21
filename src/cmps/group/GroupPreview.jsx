import { PulseList } from "../pulse/PulseList"

import { useSelector } from "react-redux";
import { addPulse, updateGroup } from "../../store/actions/selected-board.actions.js";
import { PulseList } from "../pulse/PulseList.jsx";

export function GroupPreview({ group, onRemoveGroup, onUpdateGroup }) {

    function onUpdate() {
        const newTitle = prompt('Title?')
        const titleColor = prompt('Title Color?')

        const updatedGroup = { ...group, title: newTitle, style: { ...group.style, color: titleColor } }
        onUpdateGroup(updatedGroup)
    }
    const board = useSelector(storeState => storeState.selectedBoardModule.board)

    async function onAddPulse() {
        try {
            const pulse = {
                title: 'New ' + group.type
            }
           await addPulse(board._id, group.id, pulse)
        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <section className="group-preview">
            <h2>{group.title}</h2>
            <button onClick={() => onRemoveGroup(group.id)}>Remove group</button>
            <button onClick={onAddPulse}>Add {group.type}</button>
            <PulseList group={group} pulses={group.pulses} type={group.type} />
        </section >
    )
}