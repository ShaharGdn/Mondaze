import { useInputHandler } from "../../customHooks/useInputHandler";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { addPulse } from "../../store/actions/selected-board.actions";
import { PulseSelector } from "./PulseSelector";

export function AddPulse({ board, group }) {
    const [inputRef, setIsBlurred, propToEdit, setPropToEdit,
        handleBlur, handleSubmit] = useInputHandler('', onAddPulse, true)

    async function onAddPulse(titleToAdd) {
        try {
            const pulse = {
                title: titleToAdd,
                status: 'dft3488',
                priority: 'dft3489',
                isDone: '',
            }
            await addPulse(board._id, group.id, pulse)
            showSuccessMsg('Pulse added')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot add pulse')
        }
    }

    return (
        <ul className="add-pulse-container">
            <div className="pulse-side-color" style={{ backgroundColor: group.style.color }}></div>
            <PulseSelector disabled={true} />
            <li className="title-container">
                <form onSubmit={handleSubmit}>
                    <input
                        className="add-pulse-title"
                        type="text"
                        placeholder={`+ Add ${group.type}`}
                        value={propToEdit}
                        onChange={(ev) => setPropToEdit(ev.target.value)}
                        onBlur={handleBlur}
                        onFocus={() => setIsBlurred(false)}
                        ref={inputRef}
                    />
                </form>
            </li>
        </ul>
    )
}