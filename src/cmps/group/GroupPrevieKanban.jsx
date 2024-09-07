import { useSelector } from "react-redux";
import { PulseList } from "../pulse/PulseList.jsx";
import { Droppable } from "@hello-pangea/dnd";

export function GroupPreviewKanban({ group, type }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const bgc = group.style.color

    return (
        <Droppable droppableId={group.id} type="pulse">
            {(provided) => (
                <section className="group-preview-kanban"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    <span className="group-title" style={{background : bgc}}>{group.title}  / {group.pulses.length}</span>
                    <PulseList group={group} type={type} />
                    {provided.placeholder}
                </section >
            )}
        </Droppable>
    )
}