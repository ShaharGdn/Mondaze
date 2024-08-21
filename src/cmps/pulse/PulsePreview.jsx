export function PulsePreview({ pulse, type }) {

    return (
        <section className="pulse-preview">
            <h5>{pulse.title}</h5>
            <button onClick={() => onRemovePulse(pulse.id)}>Remove {type}</button>
        </section >
    )
}