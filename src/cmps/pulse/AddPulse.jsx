import { useInputHandler } from "../../customHooks/useInputHandler";
import { PulseSelector } from "./PulseSelector";

export function AddPulse({ group }) {

    // const [inputRef, setIsBlurred, propToEdit, setPropToEdit, isEditable,
    //     setIsEditable, handleBlur, handleSubmit] = useInputHandler('', handleUpdate)

    // function handleUpdate(updatedTitle) {
    //     const pulseToUpdate = { ...pulse, title: updatedTitle }
    //     onUpdatePulse(pulseToUpdate)
    // }

    return (
        <ul className="add-pulse-container">
            <div className="pulse-side-color" style={{ backgroundColor: group.style.color }}></div>

            <PulseSelector disabled={true} />
            <li className="title-container">
                <input
                className="add-pulse-title"
                type="text"
                placeholder={`+ Add ${group.type}`}
                />
                {/* <span className="add-pulse-title">+ Add {group.type}</span> */}
            </li>
        </ul>
        // <span>+ Add {board.type} </span>
    )
}