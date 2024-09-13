import { useSelector } from "react-redux"
import { MemberPickerSearch } from "../popovers/MemberPickerSearch.jsx"
import { useState } from "react"
import { Popover } from "../popovers/Popover.jsx"

export function MemberPicker({ pulse, onUpdatePulse }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [open, setOpen] = useState(false)

    function getMemberById(memberId) {
        return board.members.find(member => member._id === memberId) // service func?
    }

    const trigger = (
        <div className="assignee-container">
            <div className="multiple-img-container">
                {pulse.memberIds?.length >= 3 && (
                    <>
                        <img
                            className="assignee-img multiple"
                            src={getMemberById(pulse.memberIds[0]).imgUrl}
                            alt="" />
                        <div className="extra-members">+{pulse.memberIds.length - 1}</div>
                    </>
                )}
                {pulse.memberIds?.length > 0 && pulse.memberIds?.length < 3 && (
                    pulse.memberIds.map((memberId, idx) => {
                        return <img
                            className={`assignee-img${pulse.memberIds?.length <= 1 ? '' : ' multiple'}`}
                            key={idx}
                            src={getMemberById(memberId).imgUrl}
                            alt="" />
                    })
                )}
                {pulse.memberIds?.length === 0 && (
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
