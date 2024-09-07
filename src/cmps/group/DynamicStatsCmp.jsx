import { DueDateBar } from "./DueDateBar"
import { NumberSumBar } from "./NumberSumBar"
import { StatsBar } from "./StatsBar"
import { TimeLineBar } from "./TimeLineBar"

export function DynamicStatsCmp({ cmp, board, group }) {
    switch (cmp) {
        case 'StatusPicker':
            return <StatsBar board={board} group={group} type={'status'} />
        case 'PriorityPicker':
            return <StatsBar board={board} group={group} type={'priority'} />
        case 'DatePicker':
            return <DueDateBar board={board} group={group} />
        case 'NumberInput':
            return <NumberSumBar board={board} group={group} />
        case 'DateRangePicker':
            return <TimeLineBar board={board} group={group} />
        case 'MemberPicker':
        case 'TextInput':
            return <div className="no-stats"></div>
        default:
            return null
    }
}