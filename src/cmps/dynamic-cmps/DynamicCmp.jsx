import { MemberPicker } from "./MemberPicker"
import { DatePicker } from "./DatePicker"
import { LabelPicker } from "./LabelPicker"
import { TextInput } from "./TextInput"
import { NumberInput } from "./NumberInput"
import { DateRangePicker } from "./DateRangePicker"

export function DynamicCmp({ cmp, onUpdatePulse, pulse, group }) {
    switch (cmp) {
        case 'StatusPicker':
            return <LabelPicker onUpdatePulse={onUpdatePulse} pulse={pulse} type={'status'} />
        case 'PriorityPicker':
            return <LabelPicker onUpdatePulse={onUpdatePulse} pulse={pulse} type={'priority'} />
        case 'MemberPicker':
            return <MemberPicker onUpdatePulse={onUpdatePulse} pulse={pulse} />
        case 'DatePicker':
            return <DatePicker onUpdatePulse={onUpdatePulse} pulse={pulse} />
        case 'TextInput':
            return <TextInput onUpdatePulse={onUpdatePulse} pulse={pulse} />
        case 'NumberInput':
            return <NumberInput onUpdatePulse={onUpdatePulse} pulse={pulse} />
        case 'DateRangePicker':
            return <DateRangePicker onUpdatePulse={onUpdatePulse} pulse={pulse} group={group}/>
        default:
            return <p>UNKNOWN {cmp}</p>
    }
}