import { BsThreeDots } from "react-icons/bs";
import { FixedPopover } from "../popovers/FixedPopover";

export function ThreeDots({ children, anchorEl, setAnchorEl, className, classNameContent }) {
    function handleClick(event) {
        event.preventDefault()
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    return (
        <div className={className}>
            <BsThreeDots
                onClick={handleClick}
            />
            <FixedPopover
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                classNameContent={classNameContent}
                children={children}
            />
        </div>
    )
}