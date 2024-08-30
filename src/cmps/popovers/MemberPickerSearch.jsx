import { useRef, useState } from "react"
import { useSelector } from "react-redux"

export function MemberPickerSearch() {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [suggestedMembers, setSuggestedMembers] = useState(board.members) //later - group.members
    const [searchTxt, setSearchTxt] = useState('')
    const membersUnfiltered = useRef(suggestedMembers)

    function handleChange({ target }) {
        const value = target.value.toLowerCase()
        setSearchTxt(target.value)

        const filteredMembers = suggestedMembers.filter(member => member.fullname.toLowerCase().includes(value))
        setSuggestedMembers([...filteredMembers])
    }

    function onClear() {
        setSearchTxt('')
        setSuggestedMembers([...membersUnfiltered])

    }


    return (
        <section className="member-picker-container">
            <div className="selected-members"></div>
            <div className="members-search">
                <div className="magnifying-glass-icon"><HiMagnifyingGlass /></div>
                <input
                    onChange={handleChange}
                    value={searchTxt}
                    type="text"
                    placeholder="Search names, roles or teams" />
                <span className="clear-member-search" onClick={onClear}>x</span>
            </div>

            <h4>Suggested people</h4>
            <ul className="suggested-members-list">
                {suggestedMembers.map((member, idx) => {
                    return <li key={idx}>
                        <img className="assignee-img" src={member.imgUrl} alt="" />
                        <span>{member.fullName}</span>
                    </li>
                })}
            </ul>
        </section>
    )
}