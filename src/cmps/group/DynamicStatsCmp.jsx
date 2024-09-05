import { DueDateBar } from "./DueDateBar"
import { StatsBar } from "./StatsBar"

export function DynamicStatsCmp({ cmp, board, group }) {
    switch (cmp) {
        case 'StatusPicker':
            return <StatsBar board={board} group={group} type={'status'} />
        case 'PriorityPicker':
            return <StatsBar board={board} group={group} type={'priority'} />
        case 'DatePicker':
            return <DueDateBar group={group} />
        case 'MemberPicker':
            return <div className="no-stats"></div>
        default:
            return null
    }
}