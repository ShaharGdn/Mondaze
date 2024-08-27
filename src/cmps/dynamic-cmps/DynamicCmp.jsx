import { MemberPicker } from "./MemberPicker"
import { DatePicker } from "./DatePicker"
import { LabelPicker } from "./LabelPicker"

export function DynamicCmp({ cmp, onUpdatePulse, pulse }) {
    switch (cmp) {
        case 'StatusPicker':
            return <LabelPicker onUpdatePulse={onUpdatePulse} pulse={pulse} type={'status'} />
        case 'PriorityPicker':
            return <LabelPicker onUpdatePulse={onUpdatePulse} pulse={pulse} type={'priority'} />
        case 'MemberPicker':
            return <MemberPicker onUpdatePulse={onUpdatePulse} pulse={pulse} />
        case 'DatePicker':
            return <DatePicker onUpdatePulse={onUpdatePulse} pulse={pulse} />
        default:
            return <p>UNKNOWN {cmp}</p>
    }
}