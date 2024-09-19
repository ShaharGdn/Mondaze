import { useSelector } from "react-redux";
import { PulseList } from "../pulse/PulseList.jsx";
import { PulseListHeader } from "../pulse/PulseListHeader.jsx";
import { GroupTitleHeader } from "./GroupTitleHeader.jsx";
import { useEffect, useState } from "react";
import { AddPulse } from "../pulse/AddPulse.jsx";
import { Droppable } from "@hello-pangea/dnd";
import { GroupStatsRow } from "./groupStatsRow.jsx";

export function GroupPreview({ group, shouldCloseAllGroups, setSidePanelOpen, setSelectedPulse }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [isGroupOpen, setIsGroupOpen] = useState(true)

    useEffect(() => {
        if (shouldCloseAllGroups) {
            setIsGroupOpen(false)
        } else {
            setIsGroupOpen(true)
        }
    }, [shouldCloseAllGroups])

    function getTitles(cmp, collapsed = false) {
        switch (cmp) {
            case 'StatusPicker': return 'Status'
            case 'MemberPicker': return collapsed ? null : 'Assignee'
            case 'DatePicker': return 'Due Date'
            case 'PriorityPicker': return 'Priority'
            case 'DateRangePicker': return 'Timeline'
            case 'TextInput': return collapsed ? null : 'Comments'
            case 'NumberInput': return 'Numbers'
            case 'PhoneInput': return collapsed ? null : 'Phone'
            case 'EmailInput': return collapsed ? null : 'Email'
            case 'FilesPicker': return collapsed ? null : 'Files'
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
                            <PulseList group={group} setSidePanelOpen={setSidePanelOpen} setSelectedPulse={setSelectedPulse} />
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