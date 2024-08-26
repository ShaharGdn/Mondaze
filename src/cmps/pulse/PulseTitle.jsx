import { Link } from "react-router-dom";
import { ICON_EMPTY_MESSAGES } from "../icons/svg-icons";
import { useRef, useState } from "react";

export function PulseTitle({ pulse, onUpdatePulse }) {
    const [isBlurred, setIsBlurred] = useState(false)
    const [titleToEdit, setTitleToEdit] = useState(pulse.title)
    const [isEditable, setIsEditable] = useState(false)
    const inputRef = useRef(null)

    function handleSubmit(ev) {
        if (ev) ev.preventDefault()
        if (isBlurred) return

        if (titleToEdit !== pulse.title) {
            onUpdatePulse(titleToEdit)
        }

        setIsBlurred(true)
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.blur()
            }
        }, 0)
    }

    function handleBlur() {
        setIsEditable(false)

        if (isBlurred) return
        handleSubmit()
    }

    return (
        <li className="pulse-title-message-container">
            <div className="pulse-title-container">
                <form className="input-container" onSubmit={handleSubmit}>
                    {isEditable ? <input
                        className="title-input"
                        // className={`title-input${isEditable ? ' editable' : ''}`}
                        type="text"
                        value={titleToEdit}
                        onChange={(ev) => setTitleToEdit(ev.target.value)}
                        onBlur={handleBlur}
                        onFocus={() => setIsBlurred(false)}
                        ref={inputRef}
                        autoFocus
                    /> : <span className="pulse-title" onClick={() => setIsEditable(true)}>{titleToEdit}</span>}
                </form>
            </div>

            {/* later make this nested route that leads to PulseDetails */}
            <Link className="pulse-messages-container">
                {ICON_EMPTY_MESSAGES}
            </Link>

        </li>
    )
}