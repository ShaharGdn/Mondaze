import { StatusPicker } from "./StatusPicker"
import { MemberPicker } from "./MemberPicker"
import { DatePicker } from "./DatePicker"
// import { PriorityPicker } from "./PriorityPicker"


export function DynamicCmp({ cmp, info, onUpdatePulse }) {
    switch (cmp) {
        case 'StatusPicker':
            return <StatusPicker info={info} onUpdatePulse={onUpdatePulse} />
        case 'MemberPicker':
            return <MemberPicker info={info} onUpdatePulse={onUpdatePulse} />
        case 'DatePicker':
            return <DatePicker info={info} onUpdatePulse={onUpdatePulse} />
        // case 'PriorityPicker':
        // return <PriorityPicker info={info} onUpdatePulse={onUpdatePulse} />
        default:
            return <p>UNKNOWN {cmp}</p>
    }
}