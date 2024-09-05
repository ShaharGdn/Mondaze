import { useSelector } from "react-redux";
import { PulseList } from "../pulse/PulseList.jsx";
import { PulseListHeader } from "../pulse/PulseListHeader.jsx";
import { GroupTitleHeader } from "./GroupTitleHeader.jsx";
import { useEffect, useState } from "react";
import { AddPulse } from "../pulse/AddPulse.jsx";
import { Droppable } from "@hello-pangea/dnd";
import { GroupStatsRow } from "./groupStatsRow.jsx";

export function GroupPreview({ group, shouldCloseAllGroups }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [isGroupOpen, setIsGroupOpen] = useState(true)

    useEffect(() => {
        if (shouldCloseAllGroups) {
            setIsGroupOpen(false)
        } else {
            setIsGroupOpen(true)
        }
    }, [shouldCloseAllGroups])

    function getTitles(cmp) {
        switch (cmp) {
            case 'StatusPicker': return 'Status'
            case 'MemberPicker': return 'Assignee'
            case 'DatePicker': return 'Due Date'
            case 'PriorityPicker': return 'Priority'
            case 'TimeLinePicker': return 'Timeline'
            case 'FilesPicker': return 'Files'
            // add more as needed
            default: return ''
        }
    }

    return (
        <Droppable droppableId={group.id} type="pulse">
            {(provided) => (
                <section className="group-preview"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    <GroupTitleHeader
                        board={board}
                        group={group}
                        getTitles={getTitles}
                        isGroupOpen={isGroupOpen}
                        setIsGroupOpen={setIsGroupOpen} />
                    {isGroupOpen &&
                        <>
                            <PulseListHeader board={board} group={group} getTitles={getTitles} />
                            <PulseList group={group} />
                            <AddPulse board={board} group={group} />
                            <GroupStatsRow board={board} group={group} />
                        </>
                    }
                    {provided.placeholder}
                </section >
            )}
        </Droppable>
    )
}