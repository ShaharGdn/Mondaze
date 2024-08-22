import { useState } from "react"

export function PulsePreview({ pulse, onRemovePulse, onUpdatePulse, type }) {
    const [pulseToEdit, setPulseToEdit] = useState(pulse)

    console.log('pulse:', pulse)

    async function handleChange() {
        try {
            const title = prompt('New title?')

            const newPulse = {
                ...pulseToEdit, title
            }

            const updatedPulse = await onUpdatePulse(newPulse)

            setPulseToEdit(updatedPulse)

        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <section className="pulse-preview">
            <h5>{pulseToEdit.title}</h5>
            <button onClick={() => onRemovePulse(pulseToEdit.id)}>Remove {type}</button>
            <button onClick={handleChange}>Update {type}</button>
        </section >
    )
}