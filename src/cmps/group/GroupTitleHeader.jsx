import { IoIosArrowDown } from "react-icons/io";

export function GroupTitleHeader({ group }) {
    return (
        <section className="group-title-header">
            {/* GroupOptionsMenu cmp in paddings place */}
            {/* <div className="collapse-group-btn"> */}
            <button className="collapse-group-btn" style={group.style}>
                <IoIosArrowDown />
            </button>
            {/* </div> */}
            <h4 className="group-title">{group.title}</h4>
        </section>
    )

}