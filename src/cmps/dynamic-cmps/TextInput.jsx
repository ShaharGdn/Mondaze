import { useSelector } from "react-redux";
import { useInputHandler } from "../../customHooks/useInputHandler";
import { ICON_CLOSE_SQUARE } from "../icons/svg-icons";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { PiTextTLight } from "react-icons/pi";


export function TextInput({ onUpdatePulse, pulse }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [inputRef, setIsBlurred, propToEdit, setPropToEdit,
        handleBlur, handleSubmit, isEditable, setIsEditable] = useInputHandler(pulse.text || '', handleUpdate)


    function handleUpdate(updatedText) {
        const pulseToUpdate = { ...pulse, text: updatedText }
        onUpdatePulse(pulseToUpdate)
    }

    function onClearText(event) {
        event.preventDefault()
        event.stopPropagation()
        const pulseToUpdate = {
            ...pulse, text: ''
        }
        onUpdatePulse(pulseToUpdate)
        setPropToEdit(pulseToUpdate.text)
    }


    return (
        <div className="pulse-text-container">
            <form className="input-container" onSubmit={handleSubmit}>
                {isEditable ? <input
                    className="text-input"
                    type="text"
                    value={propToEdit}
                    onChange={(ev) => setPropToEdit(ev.target.value)}
                    onBlur={() => handleBlur()}
                    onFocus={() => setIsBlurred(false)}
                    ref={inputRef}
                    autoFocus
                /> : <span className="pulse-text" onClick={() => setIsEditable(true)}>
                    {propToEdit ? propToEdit :
                        <div className="empty-text hidden">
                            <BsFillPlusCircleFill />
                            <PiTextTLight className="t-icon" />
                        </div>
                    }
                    <ICON_CLOSE_SQUARE className="close-btn hidden" onClick={onClearText} />
                </span>}
            </form>
        </div>
    )
}