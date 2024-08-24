import { PulsePreview } from "./PulsePreview";

export function PulseList({ group }) {

    return (
        <section className="pulses-container">
            <ul className="pulse-list">
                {group.pulses.map(pulse =>
                    <li className="pulse" key={pulse.id}>
                        <PulsePreview pulse={pulse} group={group} />
                    </li>)
                }
            </ul>
        </section>
    )
}