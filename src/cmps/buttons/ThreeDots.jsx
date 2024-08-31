import { BsThreeDots } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import { PopoverNoArrow } from "../popovers/PopoverNoArrow";

export function ThreeDots({
    children,
    open,
    setOpen,
    placement,
    MainClassName,
    classNameContent,
    type
}) {
    function handleClick(event) {
        event.preventDefault()
        event.stopPropagation()
        setOpen(!open)
    }

    const trigger = (
        <div className={MainClassName}>
            {type === 'big' ?
                <HiDotsHorizontal onClick={handleClick} size={19} />
                :
                <BsThreeDots
                    onClick={handleClick}
                />
            }
        </div>
    )

    return (
        <PopoverNoArrow
            open={open}
            setOpen={setOpen}
            children={children}
            placement={placement}
            trigger={trigger}
            classNameContent={classNameContent}
        />
    )
}