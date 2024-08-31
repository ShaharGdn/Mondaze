import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { ThreeDots } from "../buttons/ThreeDots";
import { GroupActionsList } from "../popovers/GroupActionsList";

export function GroupTitleHeader({ group, setIsGroupOpen, isGroupOpen }) {
    const [open, setOpen] = useState(false)

    const children = (
        <GroupActionsList
            group={group}
            setIsGroupOpen={setIsGroupOpen}
            isGroupOpen={isGroupOpen}
            open={open}
            setOpen={setOpen} />
    )

    return (
        <section className="group-title-header">
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
            <h4 className="group-title">{group.title}</h4>
        </section>
    )
}