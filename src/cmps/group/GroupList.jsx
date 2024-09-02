import { useSelector } from "react-redux";
import { useState } from "react";
import { GroupPreview } from "./GroupPreview";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { updateBoard } from "../../store/actions/board.actions";

export function GroupList({ groups }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [groupsToEdit, setGroups] = useState(groups)
    const [boardToEdit, setBoard] = useState(board)
    const [shouldCloseAllGroups, setShouldCloseAllGroups] = useState(false)

    async function handleGroupDnd(results) {
        try {
            const { source, destination, type } = results

            if (!destination) return
            if (source.droppableId === destination.droppableId && source.index === destination.index) return

            if (type === 'group') {
                const reorderedGroups = [...groupsToEdit]
                const sourceIndex = source.index
                const destinationIndex = destination.index

                const [removedGroup] = reorderedGroups.splice(sourceIndex, 1)
                reorderedGroups.splice(destinationIndex, 0, removedGroup)

                const boardToUpdate = {
                    ...boardToEdit, groups: reorderedGroups
                }

                const updatedBoard = await updateBoard(boardToUpdate)
                setBoard(updatedBoard)
                setGroups(reorderedGroups)
                showSuccessMsg('Group has Moved')
                setIsDragged(false)
            }
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot move group!')
        } finally {
            setIsDragged(false);
            setShouldCloseAllGroups(false);
        }

    }

    return (
        <section className="groups-container">
            <DragDropContext onDragStart={() => setShouldCloseAllGroups(true)} onDragEnd={handleGroupDnd}>
                <Droppable droppableId="group-list" type="group">
                    {(provided) => (
                        <ul className="group-list" {...provided.droppableProps} ref={provided.innerRef}>
                            {groupsToEdit.map((group, index) => (
                                <Draggable key={group.id} draggableId={group.id} index={index}>
                                    {(provided) => (
                                        <li
                                            className="group"
                                            style={group.style}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <GroupPreview group={group} shouldCloseAllGroups={shouldCloseAllGroups} />
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    )
}