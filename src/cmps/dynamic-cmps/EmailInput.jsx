import { useSelector } from "react-redux";
import { useInputHandler } from "../../customHooks/useInputHandler";
import { ICON_CLOSE_SQUARE, MAIL } from "../icons/svg-icons";
import { BsFillPlusCircleFill } from "react-icons/bs";


export function EmailInput({ onUpdatePulse, pulse }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [inputRef, setIsBlurred, propToEdit, setPropToEdit,
        handleBlur, handleSubmit, isEditable, setIsEditable] = useInputHandler(pulse.phone || '', handleUpdate)


    function handleUpdate(updatedPhone) {
        const pulseToUpdate = { ...pulse, email: updatedPhone }
        onUpdatePulse(pulseToUpdate)
    }

    function onClearInput(event) {
        event.preventDefault()
        event.stopPropagation()
        const pulseToUpdate = {
            ...pulse, email: ''
        }
        onUpdatePulse(pulseToUpdate)
        setPropToEdit(pulseToUpdate.phone)
    }


    return (
        <div className="pulse-text-container">
            <form className="input-container" onSubmit={handleSubmit}>
                {isEditable ? <input
                    className="text-input"
                    type="email"
                    value={propToEdit}
                    onChange={(ev) => setPropToEdit(ev.target.value)}
                    onBlur={() => handleBlur()}
                    onFocus={() => setIsBlurred(false)}
                    ref={inputRef}
                    autoFocus
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                /> : <span className={propToEdit ? 'pulse-text with-text' : 'pulse-text null'} onClick={() => setIsEditable(true)}>
                    {propToEdit ?
                        <a href={`mailto:${propToEdit}`}>{propToEdit}</a>
                        :
                        <div className="empty-text hidden">
                            <BsFillPlusCircleFill />
                            <MAIL className="t-icon email-icon" />
                        </div>
                    }
                    <ICON_CLOSE_SQUARE className="close-btn hidden" onClick={onClearInput} />
                </span>}
            </form>
        </div>
    )
}