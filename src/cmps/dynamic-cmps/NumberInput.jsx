import { useInputHandler } from "../../customHooks/useInputHandler";
import { ICON_CLOSE_SQUARE } from "../icons/svg-icons";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { GoNumber } from "react-icons/go";


export function NumberInput({ onUpdatePulse, pulse }) {
    const [inputRef, setIsBlurred, propToEdit, setPropToEdit,
        handleBlur, handleSubmit, isEditable, setIsEditable] = useInputHandler(+pulse.number || '', handleUpdate)


    function handleUpdate(updatedNumber) {
        const pulseToUpdate = { ...pulse, number: updatedNumber }
        onUpdatePulse(pulseToUpdate)
    }

    function onClearNumber(event) {
        event.preventDefault()
        event.stopPropagation()
        const pulseToUpdate = {
            ...pulse, number: ''
        }
        onUpdatePulse(pulseToUpdate)
        setPropToEdit(pulseToUpdate.number)
    }


    return (
        <div className="pulse-number-container">
            <form className="input-container" onSubmit={handleSubmit}>
                {isEditable ? <input
                    className="number-input"
                    type="text"
                    value={propToEdit}
                    onChange={(ev) => setPropToEdit(+ev.target.value)}
                    onBlur={() => handleBlur()}
                    onFocus={() => setIsBlurred(false)}
                    ref={inputRef}
                    autoFocus
                /> : <span className={propToEdit ? "pulse-number with-number" : "pulse-number null"} onClick={() => setIsEditable(true)}>
                    {propToEdit ? propToEdit.toLocaleString('en-GB') :
                        <div className="empty-number hidden">
                            <BsFillPlusCircleFill />
                            <GoNumber className="num-icon" />
                        </div>
                    }
                    <ICON_CLOSE_SQUARE className="close-btn hidden" onClick={onClearNumber} />
                </span>}
            </form>
        </div>
    )
}