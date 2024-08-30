import { useSelector } from "react-redux"

export function MemberPicker({ pulse, onUpdatePulse }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)

    function getMemberById(memberId) {
        return board.members.find(member => member._id === memberId)
    }

    function handleClick(event) {
        event.preventDefault()
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    return (
        <div className="assignee-container" onClick={handleClick}>
            <div className="multiple-img-container">
                {pulse.memberIds?.length > 0
                    ? pulse.memberIds.map((memberId, idx) => {
                        // if (idx > 2) {
                        return <img
                            className={`assignee-img${pulse.memberIds.length <= 1 ? '' : ' multiple'}`}
                            key={idx}
                            src={getMemberById(memberId).imgUrl}
                            alt="" />
                        // } else {
                        // return <div className="extra-assignee">+{pulse.memberIds.length - 3}</div>
                        // }
                    }
                    ) : (
                        <img className="assignee-img" src='../src/assets/img/empty_assignee.svg' alt="" />
                    )}
            </div>
            <i className="add-assignee-btn">+</i>
        </div>
    )

}