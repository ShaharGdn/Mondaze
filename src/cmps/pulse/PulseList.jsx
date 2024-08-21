import { PulsePreview } from "./PulsePreview";

export function PulseList({ pulses, type }) {
    return (

        <section className="groups-container">
            <ul className="group-list">
                {pulses.map(pulse =>
                    <li className="pulse" key={pulse.id}>
                        <PulsePreview pulse={pulse} type={type} />
                    </li>)
                }
            </ul>
        </section>
    )
}