import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


export function GroupTitleHeader({ group, setIsGroupOpen, isGroupOpen }) {
    return (
        <section className="group-title-header">
            {/* GroupOptionsMenu cmp in paddings place */}
            {/* <div className="collapse-group-btn"> */}
            <button className="collapse-group-btn" style={group.style} onClick={() => setIsGroupOpen(!isGroupOpen)}>
                {isGroupOpen &&
                    <IoIosArrowDown /> ||
                    <IoIosArrowForward />
                }
            </button>
            {/* </div> */}
            <h4 className="group-title">{group.title}</h4>
        </section>
    )
}