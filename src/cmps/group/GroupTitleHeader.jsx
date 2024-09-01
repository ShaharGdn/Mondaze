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


    const children = (
        <GroupActionsList
            group={group}
            setIsGroupOpen={setIsGroupOpen}
            isGroupOpen={isGroupOpen}
            open={open}
            setOpen={setOpen} />
    )

    return (
        <section className={`group-title-header${isGroupOpen ? '' : ' collapsed'}`}>
            <ThreeDots
                children={children}
                open={open}
                setOpen={setOpen}
                placement={'right-start'}
                MainClassName={open ? 'group-dots-actions open' : 'group-dots-actions'}
                type={'big'}
            />
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
                /> : <span className="group-title" onClick={() => setIsEditable(true)}>{propToEdit}</span>}
            </form>
        </section>
    )
}