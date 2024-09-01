import { Checkbox } from "@mui/material";
import { ICON_CHECKBOX_V_MARK } from "../icons/svg-icons";

export function PulseSelector({ disabled = false }) {
    
    return (
        <li className="pulse-select">
            <input className="pulse-checkbox" type="checkbox" disabled={disabled} />
        </li>
    )
}
    // return (
    //     <li className="pulse-select">
    //         <label htmlFor="checkbox">
    //             <input id="checkbox" className="pulse-checkbox" type="checkbox"/>
    //             <div className="checkbox-square">{ICON_CHECKBOX_V_MARK}</div>
    //         </label>
    //     </li>
    // )
