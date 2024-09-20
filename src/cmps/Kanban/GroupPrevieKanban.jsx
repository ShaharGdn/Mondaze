import { PulseListKanban } from "../Kanban/PulseListKanban.jsx";
import { Droppable } from "@hello-pangea/dnd";

export function GroupPreviewKanban({ group }) {
    const bgc = group.style.color

    return (
        <Droppable droppableId={group.id} type="pulse">
            {(provided) => (
                <section className="group-preview-kanban"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    <span className="group-title Figtree-regular" style={{ background: bgc }}>{group.title || 'No Priority'} / {group.pulses.length}</span>
                    <PulseListKanban group={group} />
                    {provided.placeholder}
                </section >
            )}
        </Droppable>
    )
}