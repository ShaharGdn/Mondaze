import { PulsePreview } from "./PulsePreview";

export function PulseList({ pulses, onRemovePulse, onUpdatePulse, type }) {
    return (

        <section className="pulses-container">
            <ul className="pulse-list">
                {pulses.map(pulse =>
                    <li className="pulse" key={pulse.id}>
                        <PulsePreview pulse={pulse} type={type} onRemovePulse={onRemovePulse} onUpdatePulse={onUpdatePulse}/>
                    </li>)
                }
            </ul>
        </section>
    )
}