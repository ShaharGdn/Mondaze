import { Link } from "react-router-dom";
import { ICON_EMPTY_MESSAGES } from "../icons/svg-icons";

export function PulseTitle({ pulse }) {
    return (
        <li className="pulse-title-message-container">
            <div className="pulse-title-container">
                <span className="pulse-title">{pulse.title}</span>
            </div>

            {/* later make this nested route that leads to PulseDetails */}
            {/* <div className="pulse-messages-container"> */}
            <Link className="pulse-messages-container">
                {/* <div> */}
                    {ICON_EMPTY_MESSAGES}
                {/* </div> */}
            </Link>
            {/* </div> */}
        </li>
    )
}