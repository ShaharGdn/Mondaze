import { Link } from "react-router-dom";
import { ICON_EMPTY_MESSAGES } from "../icons/svg-icons";
import { useInputHandler } from "../../customHooks/useInputHandler";

export function PulseTitle({ pulse, onUpdatePulse }) {
    const [inputRef, setIsBlurred, propToEdit, setPropToEdit, isEditable,
        setIsEditable, handleBlur, handleSubmit] = useInputHandler(pulse.title, handleUpdate)

    function handleUpdate(updatedTitle) {
        const pulseToUpdate = { ...pulse, title: updatedTitle }
        onUpdatePulse(pulseToUpdate)
    }

    return (
        <li className="pulse-title-message-container">
            <div className="pulse-title-container">
                <form className="input-container" onSubmit={handleSubmit}>
                    {isEditable ? <input
                        className="title-input"
                        type="text"
                        value={propToEdit}
                        onChange={(ev) => setPropToEdit(ev.target.value)}
                        onBlur={handleBlur}
                        onFocus={() => setIsBlurred(false)}
                        ref={inputRef}
                        autoFocus
                    /> : <span className="pulse-title" onClick={() => setIsEditable(true)}>{propToEdit}</span>}
                </form>
            </div>

            {/* later make this nested route that leads to PulseDetails */}
            <Link className="pulse-messages-container">
                {ICON_EMPTY_MESSAGES}
            </Link>
        </li>
    )
}
