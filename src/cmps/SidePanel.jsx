import { useInputHandler } from "../customHooks/useInputHandler"
import { IoCloseOutline } from "react-icons/io5"
import { CLOCK_ICON, ICON_HOME } from "./icons/svg-icons"
import { useState } from "react"


import 'quill/dist/quill.snow.css'
import { QuillEditor } from "./QuillEditor"
import { useSelector } from "react-redux"
import { UpdatesList } from "./UpdatesList"
import { makeId } from "../services/util.service"

export function SidePanel({ sidePanelOpen, setSidePanelOpen, selectedPulse, onUpdatePulse }) {
    const { pulse, groupId } = selectedPulse
    const [displayType, setDisplayType] = useState(null)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [inputRef, setIsBlurred, propToEdit, setPropToEdit,
        handleBlur, handleSubmit, isEditable, setIsEditable] = useInputHandler(pulse.title, handleUpdate)

    function handleUpdate(updatedTitle) {
        const pulseToUpdate = { ...pulse, title: updatedTitle }
        onUpdatePulse(groupId, pulseToUpdate)
    }

    function onAddUpdate(newUpdate) {
        const newUpdateWithId = { ...newUpdate, id: makeId() }
        const pulseToUpdate = {
            ...pulse,
            updates: [newUpdateWithId, ...pulse.updates || []]
        }
        onUpdatePulse(groupId, pulseToUpdate)
    }

    function onDeleteUpdate(updateId) {
        const newUpdates = pulse.updates.filter(update => update.id !== updateId)

        const pulseToUpdate = {
            ...pulse,
            updates: newUpdates
        }

        onUpdatePulse(groupId, pulseToUpdate)
    }

    return (
        <div className="side-panel-container">
            <div className={sidePanelOpen ? "side-panel open" : "side-panel close"}>
                {sidePanelOpen && <div className="side-panel-content">
                    <div className="header poppins-semibold">
                        <div className="header-content">
                            <button className="close-btn" onClick={() => setSidePanelOpen((prevOpen) => !prevOpen)}>
                                <IoCloseOutline size={25} className="icon" />
                            </button>
                            <form onSubmit={handleSubmit}>
                                {isEditable ? (
                                    <input
                                        className="title-input"
                                        type="text"
                                        value={propToEdit}
                                        onChange={(ev) => setPropToEdit(ev.target.value)}
                                        onBlur={() => handleBlur()}
                                        onFocus={() => setIsBlurred(false)}
                                        ref={inputRef}
                                        autoFocus
                                    />
                                ) : (
                                    <span className="pulse-title" onClick={() => setIsEditable(true)}>{propToEdit}</span>
                                )}
                            </form>
                            <nav className="update-activity-container">
                                <ul>
                                    <li className={displayType === "updates" ? "updates active" : "updates"} onClick={() => setDisplayType("updates")}>
                                        <span className="title">
                                            <ICON_HOME className="icon" />
                                            Updates
                                        </span>
                                    </li>
                                    <li className={displayType === "activities" ? "activities active" : "activities"} onClick={() => setDisplayType("activities")}>
                                        <span className="title"> Activity Log</span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="pulse-container">
                        <div className="pulse-content">
                            <QuillEditor loggedInUser={loggedInUser} pulse={pulse} onAddUpdate={onAddUpdate} />
                            <UpdatesList pulse={pulse} onDeleteUpdate={onDeleteUpdate} />
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}
