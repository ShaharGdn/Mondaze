import { Droppable, Draggable } from "@hello-pangea/dnd"
import { PulsePreview } from "./PulsePreview";

export function PulseList({ group, type }) {
    return (
        <section className="pulses-container">
            <Droppable droppableId={group.id} type="pulse">
                {(provided) => (
                    <ul
                        className="pulse-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {group.pulses.map((pulse, index) => (
                            <Draggable key={pulse.id} draggableId={pulse.id} index={index}>
                                {(provided) => (
                                    <li
                                        className="pulse"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <PulsePreview pulse={pulse} group={group} type={type}/>
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </section>
    )
}