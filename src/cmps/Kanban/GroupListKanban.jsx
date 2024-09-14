import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { updateBoard } from "../../store/actions/board.actions";
import { GroupPreviewKanban } from "./GroupPrevieKanban";

export function GroupListKanban({ groups, board }) {
    const [groupsToEdit, setGroups] = useState(groupPulsesByStatus(board.views[0]?.kanban.groups) || groupPulsesByStatus(groups))
    const [boardToEdit, setBoard] = useState(board)

    useEffect(() => {
        setGroups(groupPulsesByStatus(groups))
        setBoard(board)

    }, [board, groups])

    function groupPulsesByStatus(groups) {
        if (!board?.status) return

        const statuses = board.status

        const allPulses = groups.reduce((allPulses, group) => {
            return [...allPulses, ...group.pulses]
        }, [])

        const groupedPulses = statuses.map((status) => {
            const pulsesForStatus = allPulses.filter(pulse => pulse.status === status.id)

            // Only include the status if there are pulses associated with it
            if (pulsesForStatus.length > 0) {
                return {
                    title: status.title,
                    id: status.id,
                    archivedAt: null,
                    pulses: pulsesForStatus,
                    style: { color: status.color },
                }
            }

            return null
        }).filter(group => group !== null)

        return groupedPulses
    }

    async function handleGroupDnd(results) {
        try {
            const { source, destination, type } = results

            if (!destination) return
            if (source.droppableId === destination.droppableId && source.index === destination.index) return

            // If moving groups
            if (type === 'kanban-group') {
                const reorderedGroups = [...groupsToEdit]
                const sourceIndex = source.index
                const destinationIndex = destination.index

                const [removedGroup] = reorderedGroups.splice(sourceIndex, 1)
                reorderedGroups.splice(destinationIndex, 0, removedGroup)

                const boardToUpdate = {
                    ...boardToEdit,
                    views: [
                        {
                            kanban: {
                                groups: reorderedGroups
                            }
                        }
                    ]
                }

                const updatedBoard = await updateBoard(boardToUpdate)
                setBoard(updatedBoard)
                setGroups(reorderedGroups)
                showSuccessMsg('Group has Moved')

            } else if (type === 'pulse') {
                // If moving pulses in the same group
                if (source.droppableId === destination.droppableId) {
                    const group = groupsToEdit.find(group => group.id === destination.droppableId)
                    const reorderedGroup = { ...group }
                    const sourceIndex = source.index
                    const destinationIndex = destination.index

                    const [removedPulse] = reorderedGroup.pulses.splice(sourceIndex, 1)
                    reorderedGroup.pulses.splice(destinationIndex, 0, removedPulse)

                    const reorderedGroups = groupsToEdit.map(group => {
                        return group.id === reorderedGroup.id ? reorderedGroup : group
                    })

                    const boardToUpdate = {
                        ...boardToEdit,
                        views: [
                            {
                                kanban: {
                                    groups: reorderedGroups
                                }
                            }
                        ]
                    }

                    const updatedBoard = await updateBoard(boardToUpdate)
                    setBoard(updatedBoard)
                    setGroups(reorderedGroups)
                } else {
                    // If moving pulses in different group
                    // remove pulse from source group
                    const sourceGroup = groupsToEdit.find(group => group.id === source.droppableId)
                    const reorderedSourceGroup = { ...sourceGroup }
                    const sourceIndex = source.index
                    const [removedPulse] = reorderedSourceGroup.pulses.splice(sourceIndex, 1)

                    // change the pulse status
                    removedPulse.status = destination.droppableId

                    // add pulse to destination group
                    const destinationGroup = groupsToEdit.find(group => group.id === destination.droppableId)
                    const reorderedDestinationGroup = { ...destinationGroup }
                    const destinationIndex = destination.index
                    reorderedDestinationGroup.pulses.splice(destinationIndex, 0, removedPulse)

                    const reorderedGroups = groupsToEdit.map(group =>
                        group.id === reorderedSourceGroup.id
                            ? reorderedSourceGroup
                            : group.id === reorderedDestinationGroup.id
                                ? reorderedDestinationGroup
                                : group
                    )

                    const boardToUpdate = {
                        ...boardToEdit,
                        views: [
                            {
                                kanban: {
                                    groups: reorderedGroups
                                }
                            }
                        ]
                    }

                    const updatedBoard = await updateBoard(boardToUpdate)
                    setBoard(updatedBoard)
                    setGroups(reorderedGroups)
                }
            }
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot move group!')
        }
    }

    return (
        <section className="groups-container kanban">
            <DragDropContext onDragEnd={handleGroupDnd}>
                <Droppable droppableId="group-list" type="kanban-group">
                    {(provided) => (
                        <ul className="group-list" {...provided.droppableProps} ref={provided.innerRef}>
                            {groupsToEdit.map((group, index) => {
                                // Render the li only if group.pulses.length > 0
                                if (group.pulses.length > 0) {
                                    return (
                                        <Draggable key={group.id} draggableId={group.id} index={index}>
                                            {(provided) => (
                                                <li
                                                    style={group.style}
                                                    className="group"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <GroupPreviewKanban group={group} />
                                                </li>
                                            )}
                                        </Draggable>
                                    )
                                }
                                return null; // Return null for groups with no pulses
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    )
}