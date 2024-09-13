import { Link } from "react-router-dom";
import { ICON_EMPTY_MESSAGES } from "../icons/svg-icons";
import { useInputHandler } from "../../customHooks/useInputHandler";

export function PulseTitle({ pulse, groupId, onUpdatePulse, setSidePanelOpen, setSelectedPulse }) {
    const [inputRef, setIsBlurred, propToEdit, setPropToEdit,
        handleBlur, handleSubmit, isEditable, setIsEditable] = useInputHandler(pulse.title, handleUpdate)

    function handleUpdate(updatedTitle) {
        const pulseToUpdate = { ...pulse, title: updatedTitle }
        onUpdatePulse(pulseToUpdate)
        setSelectedPulse({ pulse: pulseToUpdate, groupId })
    }

    function onOpenSidePanel() {
        setSelectedPulse((prevPulse) => {
            if (prevPulse?.pulse?.id !== pulse.id) {
                setSidePanelOpen(true)
                return { pulse, groupId }

            }
            setSidePanelOpen((prevOpen) => !prevOpen)
            return prevPulse
        })
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
                        onBlur={() => handleBlur()}
                        onFocus={() => setIsBlurred(false)}
                        ref={inputRef}
                        autoFocus
                    /> : <span className="pulse-title" onClick={() => setIsEditable(true)}>{propToEdit}</span>}
                </form>
            </div>

            {/* later make this nested route that leads to PulseDetails */}
            <Link className="pulse-messages-container" onClick={onOpenSidePanel}>
                {ICON_EMPTY_MESSAGES}
            </Link>
        </li>
    )
}
