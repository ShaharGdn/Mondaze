import { useEffect, useState } from "react";
import { GroupPreview } from "./GroupPreview";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { updateBoard } from "../../store/actions/board.actions";
import { updateGroup } from "../../store/actions/selected-board.actions";
import { boardService } from "../../services/board";

export function GroupList({ groups, board, setSidePanelOpen, setSelectedPulse }) {
    const [groupsToEdit, setGroups] = useState(groups)
    const [boardToEdit, setBoard] = useState(board)
    const [shouldCloseAllGroups, setShouldCloseAllGroups] = useState(false)

    useEffect(() => {
        setGroups(groups)
        setBoard(board)
    }, [groups, board])

    async function handleGroupDnd(results) {
        try {
            const { source, destination, type } = results

            if (!destination) return
            if (source.droppableId === destination.droppableId && source.index === destination.index) return

            // If moving groups
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

            } else if (type === 'pulse') {
                // If moving pulses in the same group
                if (source.droppableId === destination.droppableId) {
                    const group = await boardService.getGroupById(boardToEdit._id, source.droppableId)
                    const reorderedGroup = { ...group }
                    const sourceIndex = source.index
                    const destinationIndex = destination.index

                    const [removedPulse] = reorderedGroup.pulses.splice(sourceIndex, 1)
                    reorderedGroup.pulses.splice(destinationIndex, 0, removedPulse)
                    await updateGroup(boardToEdit._id, reorderedGroup)
                    showSuccessMsg('Pulse has Moved')

                } else {
                    // If moving pulses in different group
                    const sourceGroup = await boardService.getGroupById(boardToEdit._id, source.droppableId)
                    const reorderedSourceGroup = { ...sourceGroup }
                    const sourceIndex = source.index
                    const [removedPulse] = reorderedSourceGroup.pulses.splice(sourceIndex, 1)

                    const destinationGroup = await boardService.getGroupById(boardToEdit._id, destination.droppableId)
                    removedPulse.groupId = destinationGroup.id
                    const reorderedDestinationGroup = { ...destinationGroup }
                    const destinationIndex = destination.index
                    reorderedDestinationGroup.pulses.splice(destinationIndex, 0, removedPulse)

                    await updateGroup(boardToEdit._id, reorderedSourceGroup)
                    await updateGroup(boardToEdit._id, reorderedDestinationGroup)
                    showSuccessMsg('Pulse has Moved')
                }
            }
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot move group!')
        } finally {
            // setShouldCloseAllGroups(false)
        }
    }

    return (
        <section className="groups-container">
            <DragDropContext onDragEnd={handleGroupDnd}>
                {/* <DragDropContext onDragStart={() => setShouldCloseAllGroups(true)} onDragEnd={handleGroupDnd}> */}
                <Droppable droppableId="group-list" type="group">
                    {(provided) => (
                        <ul className="group-list" {...provided.droppableProps} ref={provided.innerRef}>
                            {groupsToEdit.map((group, index) => (
                                <Draggable key={group.id} draggableId={group.id} index={index} >
                                    {(provided) => (
                                        <li
                                            style={group.style}
                                            className="group"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <GroupPreview group={group} shouldCloseAllGroups={shouldCloseAllGroups} setSidePanelOpen={setSidePanelOpen} setSelectedPulse={setSelectedPulse} />
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