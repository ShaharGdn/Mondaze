import { useSelector } from "react-redux";
import { useInputHandler } from "../../customHooks/useInputHandler";
import { ICON_CLOSE_SQUARE } from "../icons/svg-icons";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { SlScreenSmartphone } from "react-icons/sl";


export function PhoneInput({ onUpdatePulse, pulse }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [inputRef, setIsBlurred, propToEdit, setPropToEdit,
        handleBlur, handleSubmit, isEditable, setIsEditable] = useInputHandler(pulse.phone || '', handleUpdate)


    function handleUpdate(updatedPhone) {
        const pulseToUpdate = { ...pulse, phone: updatedPhone }
        onUpdatePulse(pulseToUpdate)
    }

    function onClearInput(event) {
        event.preventDefault()
        event.stopPropagation()
        const pulseToUpdate = {
            ...pulse, phone: ''
        }
        onUpdatePulse(pulseToUpdate)
        setPropToEdit(pulseToUpdate.phone)
    }


    return (
        <div className="pulse-text-container">
            <form className="input-container" onSubmit={handleSubmit}>
                {isEditable ? <input
                    className="text-input"
                    type="text"
                    value={isNaN(propToEdit) ? 0 : propToEdit}
                    onChange={(ev) => setPropToEdit(ev.target.value)}
                    onBlur={() => handleBlur()}
                    onFocus={() => setIsBlurred(false)}
                    placeholder="(055)-0000000"
                    ref={inputRef}
                    autoFocus
                /> : <span className={propToEdit ? 'pulse-text with-text' : 'pulse-text null'} onClick={() => setIsEditable(true)}>
                    {propToEdit ?
                        <div className="phone">
                            <img src="/src/assets/img/flag_il.png" alt="" />
                            <a href={`tel:+${propToEdit}`}>{propToEdit}</a>
                        </div>
                        :
                        <div className="empty-text hidden">
                            <BsFillPlusCircleFill />
                            <SlScreenSmartphone className="t-icon" size={16}/>
                        </div>
                    }
                    <ICON_CLOSE_SQUARE className="close-btn hidden" onClick={onClearInput} />
                </span>}
            </form>
        </div>
    )
}