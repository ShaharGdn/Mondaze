import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { ThreeDots } from "../buttons/ThreeDots";
import { GroupActionsList } from "../popovers/GroupActionsList";
import { useInputHandler } from "../../customHooks/useInputHandler";
import { updateGroup } from "../../store/actions/selected-board.actions";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { DynamicStatsCmp } from "./DynamicStatsCmp";

export function GroupTitleHeader({ board, group, getTitles, setIsGroupOpen, isGroupOpen }) {
    const [open, setOpen] = useState(false)
    const [inputRef, setIsBlurred, propToEdit, setPropToEdit,
        handleBlur, handleSubmit, isEditable, setIsEditable] = useInputHandler(group.title, handleTitleUpdate)

    async function onUpdateGroup(updatedGroup) {
        try {
            await updateGroup(board._id, updatedGroup)
            showSuccessMsg(`Group updated (id: ${updatedGroup.id})`)
        } catch (err) {
            showErrorMsg('Cannot update group')
        }
    }

    function handleTitleUpdate(titleToUpdate) {
        const updatedGroup = { ...group, title: titleToUpdate }
        onUpdateGroup(updatedGroup)
    }

    function onRename() {
        setIsEditable(true)
    }

    const children = (
        <GroupActionsList
            group={group}
            setIsGroupOpen={setIsGroupOpen}
            isGroupOpen={isGroupOpen}
            open={open}
            setOpen={setOpen}
            onRename={onRename} />
    )

    return (
        <>
            <div className="group-dots-wrapper">
                <ThreeDots
                    children={children}
                    open={open}
                    setOpen={setOpen}
                    placement={'right-start'}
                    MainClassName={open ? 'group-dots-actions open' : 'group-dots-actions'}
                    type={'big'}
                />
            </div>

            <section className="full-group-container">
                <div className="sticky-horizontal-wrapper">
                    {!isGroupOpen && <div className="pulse-side-color" style={{ backgroundColor: group.style.color }}></div>}

                    <section className={`group-title-header${isGroupOpen ? '' : ' collapsed'}`}>
                        <button
                            className="collapse-group-btn"
                            style={group.style}
                            onClick={() => setIsGroupOpen(!isGroupOpen)}
                        >
                            {isGroupOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                        </button>

                        <form className="input-container" onSubmit={handleSubmit}>
                            {isEditable ? <input
                                className="title-input"
                                type="text"
                                value={propToEdit}
                                onChange={(ev) => setPropToEdit(ev.target.value)}
                                onBlur={() => handleBlur()}
                                onFocus={() => setIsBlurred(false)}
                                ref={inputRef}
                                style={group.style}
                                autoFocus
                            /> : <div className={`data-container${isGroupOpen ? '' : ' collapsed'}`}>
                                <h4 className="group-title" style={group.style}
                                    onClick={onRename}>{propToEdit}</h4>
                                {/* onClick={() => setIsEditable(true)}>{propToEdit}</h4> */}
                                <span className="pulse-count">
                                    {group.pulses.length > 0
                                        ? `${group.pulses.length} ${board.type}${group.pulses.length === 1 ? '' : 's'}`
                                        : `No ${board.type}s`}
                                </span>
                            </div>}
                        </form>
                    </section>
                </div>

                {!isGroupOpen && <ul className="cmps-stats-wrapper">
                    {board.cmpsOrder.map((cmp, idx) =>
                        <li className="cmp-stats-container" key={cmp + idx}>
                            <span className="pulse-list-title">{getTitles(cmp, true)}</span>
                            <DynamicStatsCmp board={board} cmp={cmp} group={group} />

                        </li>)}
                </ul>
                }
            </section >
        </>
    )
}

