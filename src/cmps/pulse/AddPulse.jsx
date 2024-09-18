import { useInputHandler } from "../../customHooks/useInputHandler";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { SOCKET_EVENT_ADD_PULSE, socketService } from "../../services/socket.service";
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
            const addedPulse = await addPulse(board._id, group.id, pulse)
            // const data = { groupId: group.id, pulse: addedPulse }
            // socketService.emit(SOCKET_EVENT_ADD_PULSE, data)
            showSuccessMsg('Pulse added')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot add pulse')
        }
    }

    return (
        <ul className="add-pulse-container">
            <div className="sticky-horizontal-wrapper">

                <div className="pulse-side-color" style={{ backgroundColor: group.style.color }}></div>
                <PulseSelector disabled={true} />
                <li className="title-container">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="add-pulse-title"
                            type="text"
                            placeholder={`+ Add ${board.type}`}
                            value={propToEdit}
                            onChange={(ev) => setPropToEdit(ev.target.value)}
                            onBlur={handleBlur}
                            onFocus={() => setIsBlurred(false)}
                            ref={inputRef}
                        />
                    </form>
                </li>
            </div>
        </ul>
    )
}