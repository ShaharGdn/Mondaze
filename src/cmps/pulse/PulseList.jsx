import { PulsePreview } from "./PulsePreview";

export function PulseList({ group, onUpdatePulse }) {

    return (
        <section className="pulses-container">
            <ul className="pulse-list">
                {group.pulses.map(pulse =>
                    <li className="pulse" key={pulse.id}>
                        <PulsePreview pulse={pulse} group={group} onUpdatePulse={onUpdatePulse} />
                        {/* <PulsePreview pulse={pulse} type={type} onRemovePulse={onRemovePulse} onUpdatePulse={onUpdatePulse} /> */}
                    </li>)
                }
            </ul>
        </section>
    )
}