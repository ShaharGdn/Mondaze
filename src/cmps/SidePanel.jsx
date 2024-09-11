import { useInputHandler } from "../customHooks/useInputHandler";
import { IoCloseOutline } from "react-icons/io5";
import { ICON_HOME } from "./icons/svg-icons";
import { useEffect, useState, useRef } from "react";
import { useQuill } from 'react-quilljs';
import Quill from 'quill'; // Import Quill directly

import 'quill/dist/quill.snow.css'; // Import Quill CSS for snow theme
import { QuillEditor } from "./QuillEditor";

export function SidePanel({ sidePanelOpen, setSidePanelOpen, selectedPulse, onUpdatePulse }) {
    const { pulse, groupId } = selectedPulse;
    const [displayType, setDisplayType] = useState(null);
    console.log('sidePanelOpen:', sidePanelOpen)

    const [inputRef, setIsBlurred, propToEdit, setPropToEdit,
        handleBlur, handleSubmit, isEditable, setIsEditable] = useInputHandler(pulse.title, handleUpdate);

    function handleUpdate(updatedTitle) {
        const pulseToUpdate = { ...pulse, title: updatedTitle }
        onUpdatePulse(groupId, pulseToUpdate)
    }

    return (
        <div className="side-panel-container">
            <div className={sidePanelOpen ? "side-panel open" : "side-panel close"}>
                <div className="side-panel-content">
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
                            <nav className="update-types-container">
                                <ul className="update-list">
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
                            <QuillEditor />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
