import { BsArrowsCollapse } from "react-icons/bs";
import { BiCollapseVertical } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { LuPen } from "react-icons/lu";
import { BiColorFill } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { BsArrowsExpand } from "react-icons/bs";
import { addGroup, duplicateGroup, removeGroup, updateGroup } from "../../store/actions/selected-board.actions";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { useState } from "react";


export function GroupActionsList({ group, isGroupOpen, setIsGroupOpen, open, setOpen }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [groupToEdit, setGroupToEdit] = useState(group)

    function onCollapseGroup() {
        setOpen(null)
        setIsGroupOpen(!isGroupOpen)
    }

    async function onAddGroup(position = 'start') {
        try {
            setOpen(null)
            await addGroup(board._id, position)
            showSuccessMsg(`Group added`)
        } catch (err) {
            showErrorMsg('Cannot add group')
        }
    }

    async function onRemoveGroup() {
        try {
            await removeGroup(board._id, groupToEdit.id)
            showSuccessMsg(`Group removed (id: ${groupToEdit.id})`)
            setOpen(null)
        } catch (err) {
            showErrorMsg('Cannot remove group')
        }
    }

    async function onUpdateGroup() {
        const newTitle = prompt('Title?')
        const titleColor = prompt('Title Color?')

        try {
            const updatedGroup = { ...groupToEdit, title: newTitle, style: { ...groupToEdit.style, color: titleColor } }
            await updateGroup(board._id, updatedGroup)
            showSuccessMsg(`Group updated (id: ${updatedGroup.id})`)
            setOpen(null)
        } catch (err) {
            showErrorMsg('Cannot update group')
        }
    }

    async function onDuplicateGroup() {
        try {
            const newGroup = { ...groupToEdit }
            delete newGroup.id
            await duplicateGroup(newGroup, board._id)
            showSuccessMsg('Group Duplicated Successfully')
        } catch (err) {
            console.log('err: Cannot Duplicated Group', err)
            showErrorMsg('Cannot Duplicated Group')
        } finally {
            setOpen(null)
        }
    }

    return (
        <ul className="group-actions-list Figtree-regular">
            <li onClick={onCollapseGroup}>
                {isGroupOpen ?
                    <BsArrowsCollapse className="icon" />
                    :
                    <BsArrowsExpand className="icon" />
                }
                <span>{`${isGroupOpen ? 'Collapse' : 'Expand'} this group`}</span>
            </li>
            <li onClick={() => onAddGroup('start')}>
                <IoIosAddCircleOutline className="icon" />
                <span>Add group</span>
            </li>
            <li onClick={onDuplicateGroup}>
                <HiOutlineDocumentDuplicate className="icon" />
                <span>Duplicate this group</span>
            </li>
            <li  onClick={onUpdateGroup}>
                <LuPen className="icon" />
                <span>Rename group</span>
            </li>
            <li>
                <BiColorFill className="icon" />
                <span>Change group color</span>
            </li>
            <li onClick={() => onRemoveGroup(group.id)}>
                <AiOutlineDelete className="icon" />
                <span>Delete</span>
            </li>
            {/* <li>
                <LuArchive className="icon" />
                <span>Archive</span>
            </li> */}
        </ul>
    )
}