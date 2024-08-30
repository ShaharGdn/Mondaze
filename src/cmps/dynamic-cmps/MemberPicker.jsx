import { useSelector } from "react-redux"
import { MemberPickerSearch } from "../modals/MemberPickerSearch"
import { useState } from "react"
import { Popover } from "../modals/Popover"

export function MemberPicker({ pulse, onUpdatePulse }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [open, setOpen] = useState(false)

    function getMemberById(memberId) {
        return board.members.find(member => member._id === memberId) // service func?
    }

    const trigger = (
        <div className="assignee-container">
            <div className="multiple-img-container">
                {pulse.memberIds.length > 0
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

    return (
        <Popover trigger={trigger} open={open} setOpen={setOpen}>
            <MemberPickerSearch
                pulse={pulse}
                onUpdatePulse={onUpdatePulse}
                setOpen={setOpen} />
        </Popover>
    )
}
