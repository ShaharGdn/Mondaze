import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { HiXMark } from "react-icons/hi2"
import { ICON_SEARCH } from "../icons/svg-icons"

export function MemberPickerSearch({ pulse, onUpdatePulse, setOpen }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)

    const [suggestedMembers, setSuggestedMembers] = useState([])
    const [selectedMembers, setSelectedMembers] = useState([])
    const availableMembers = useRef(getAvailableMembers())

    useEffect(() => {
        setSuggestedMembers(getAvailableMembers())
        setSelectedMembers(getSelectedMembers())
    }, [])

    function getAvailableMembers() {
        return board.members.filter(member => !pulse.memberIds.includes(member._id))
    }

    function getSelectedMembers() {
        return board.members.filter(member => pulse.memberIds.includes(member._id))
    }

    function handleChange({ target }) {
        const value = target.value.toLowerCase()
        const filteredMembers = availableMembers.current.filter(member => member.fullname.toLowerCase().includes(value))
        setSuggestedMembers([...filteredMembers])
    }

    function onSelectMember(member) {
        const updatedPulse = { ...pulse, memberIds: [...pulse.memberIds, member._id] }
        onUpdatePulse(updatedPulse)
        setOpen(false)
    }

    function onRemoveMember(selectedMember) {
        const filteredMembers = selectedMembers.filter(member => member._id !== selectedMember._id)

        setSelectedMembers([...filteredMembers])
        setSuggestedMembers([...suggestedMembers, selectedMember])

        const filteredMembersIds = filteredMembers.map(member => member._id)
        const updatedPulse = { ...pulse, memberIds: [...filteredMembersIds] }
        onUpdatePulse(updatedPulse)
    }

    // function onClear() {
    //     setSuggestedMembers([...availableMembers.current])
    // }

    return (
        <section className="member-picker-container">
            <ul className="selected-members">
                {selectedMembers.map((member, idx) => {
                    return <li key={idx}>
                        <img className="assignee-img" src={member.imgUrl} alt="" />
                        <span>{member.fullname}</span>
                        <div className="x-btn" onClick={() => onRemoveMember(member)}><HiXMark /></div>
                    </li>
                })}
            </ul>
            <section className="members-search-container">
                <div className="members-search">
                    <span className="magnifying-glass-icon">{ICON_SEARCH}</span>
                    <input
                        onChange={handleChange}
                        // value={searchTxt}
                        type="search"
                        placeholder="Search names, roles or teams" />
                    {/* <span className="clear-member-search" onClick={onClear}>x</span> */}
                </div>
                <section className="suggested-container">
                    <h4 className="suggested-title">Suggested people</h4>
                    <ul className="suggested-members-list">
                        {suggestedMembers.map((member, idx) => {
                            return <li key={idx} onClick={() => onSelectMember(member)}>
                                <img className="assignee-img" src={member.imgUrl} alt="" />
                                <span>{member.fullname}</span>
                            </li>
                        })}
                    </ul>
                </section>
            </section>
        </section>
    )
}