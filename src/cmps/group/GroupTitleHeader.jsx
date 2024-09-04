import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { ThreeDots } from "../buttons/ThreeDots";
import { GroupActionsList } from "../popovers/GroupActionsList";
import { useInputHandler } from "../../customHooks/useInputHandler";
import { updateGroup } from "../../store/actions/selected-board.actions";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";

export function GroupTitleHeader({ board, group, setIsGroupOpen, isGroupOpen }) {
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
    // later pass this into GroupPreview for both here and PulseListHeader
    function getTitles(cmp) {
        switch (cmp) {
            case 'StatusPicker': return 'Status'
            case 'MemberPicker': return 'Assignee'
            case 'DatePicker': return 'Due Date'
            case 'PriorityPicker': return 'Priority'
            case 'TimeLinePicker': return 'Timeline'
            case 'FilesPicker': return 'Files'
            // add more as needed
            default: return ''
        }
    }

    // async function onUpdateGroup() {
    //     const newTitle = prompt('Title?')
    //     const titleColor = prompt('Title Color?')

    //     try {
    //         const updatedGroup = { ...group, title: newTitle, style: { ...group.style, color: titleColor } }
    //         await updateGroup(board._id, updatedGroup)
    //         showSuccessMsg(`Group updated (id: ${updatedGroup.id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update group')
    //     }
    // }

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
        <section className="full-group-container">
            <div className="sticky-horizontal-wrapper">

                <ThreeDots
                    children={children}
                    open={open}
                    setOpen={setOpen}
                    placement={'right-start'}
                    MainClassName={open ? 'group-dots-actions open' : 'group-dots-actions'}
                    type={'big'}
                />

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

            <section className="cmps-title-container">

                {!isGroupOpen && board.cmpsOrder.map((cmp, idx) =>
                    <li className="cmp-title-container" key={cmp + idx}>
                        {/* <span className="pulse-list-title">{cmp}</span> */}
                        <span className="pulse-list-title">{getTitles(cmp)}</span>
                    </li>)
                }

            </section>

        </section>
    )
}
