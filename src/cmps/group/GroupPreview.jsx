import { useSelector } from "react-redux";
import { PulseList } from "../pulse/PulseList.jsx";
import { PulseListHeader } from "../pulse/PulseListHeader.jsx";
import { GroupTitleHeader } from "./GroupTitleHeader.jsx";
import { useEffect, useState } from "react";
import { AddPulse } from "../pulse/AddPulse.jsx";

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

    return (
        <section className="group-preview">
            {/* 3 DOTS CMP for group */}
            <GroupTitleHeader
                board={board}
                group={group}
                isGroupOpen={isGroupOpen}
                setIsGroupOpen={setIsGroupOpen} />
            {isGroupOpen &&
                <>
                    <PulseListHeader board={board} group={group} />
                    <PulseList group={group} />
                    <AddPulse board={board} group={group} />
                </>
            }
        </section >
    )
}