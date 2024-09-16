import { IoIosArrowDown } from "react-icons/io";
import { BoardDetailsContent } from "./popovers/BoardDetailsContent";
import { PopoverNoArrow } from "./popovers/PopoverNoArrow";
import { useState } from "react";

export function BoardHeader({ board }) {
    const [open, setOpen] = useState(null)

    const trigger = (
        <div className="board-header">
            <h2 className="board-title">{board?.title}</h2>
            <div>
                <IoIosArrowDown />
            </div>
        </div>
    )

    const children = (
        <BoardDetailsContent board={board} />
    )

    return (
        <PopoverNoArrow
            open={open}
            setOpen={setOpen}
            children={children}
            placement={'bottom-start'}
            trigger={trigger}
            className="pop-over-board-details"
        />
    )
}