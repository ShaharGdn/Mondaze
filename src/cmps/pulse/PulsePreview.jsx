import { useState } from "react"
import { PulseSelector } from "./PulseSelector"
import { PulseTitle } from "./PulseTitle"

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
        <ul className="pulse-preview">
            <PulseSelector />
            <PulseTitle pulse={pulse} />
            <button onClick={() => onRemovePulse(pulseToEdit.id)}>Remove {type}</button>
            <button onClick={handleChange}>Update {type}</button>
        </ul >
    )
}