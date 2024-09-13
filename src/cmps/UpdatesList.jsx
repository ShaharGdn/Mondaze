import { useState } from "react"
import { timeAgo } from "../services/util.service"
import { ThreeDots } from "./buttons/ThreeDots"
import { CLOCK_ICON } from "./icons/svg-icons"
import { AiOutlineDelete } from "react-icons/ai"

export function UpdatesList({ pulse, onDeleteUpdate }) {
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null)

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(prevIndex => prevIndex === index ? null : index)
    }

    function deleteUpdate(updateId) {
        onDeleteUpdate(updateId)
        setOpenDropdownIndex(null)
    }

    function actionsList(update) {
        return (
            <div className="actions-list" onClick={() => deleteUpdate(update.id)}>
                <div className="delete">
                    <AiOutlineDelete className="icon" />
                    <span>Delete update</span>

                </div>
            </div>
        )
    }

    return (
        <ul className="updates-list Figtree-regular">
            {pulse.updates?.map((update, idx) => {
                return (
                    <li key={idx} className="update">
                        <div className="update-header">
                            <div className="user-details">
                                <img src={update.createdBy.imgUrl} alt="user profile picture" />
                                <span>{update.createdBy.fullname}</span>
                            </div>
                            <div className="time-and-delete">
                                <CLOCK_ICON />
                                <span>{timeAgo(new Date(update.createdAt))}</span>
                                <ThreeDots
                                    children={actionsList(update)}
                                    open={openDropdownIndex === idx}
                                    setOpen={() => toggleDropdown(idx)}
                                    MainClassName={openDropdownIndex === idx ? 'update-dots-actions open' : 'update-dots-actions'}
                                    placement={'bottom-start'}
                                />
                            </div>
                        </div>
                        <div className="update-content Figtree-regular">
                            <span className="content" dangerouslySetInnerHTML={{ __html: update.content }} />
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
