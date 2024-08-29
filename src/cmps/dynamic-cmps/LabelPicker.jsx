import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Popover } from "../modals/Popover";

export function LabelPicker({ type, onUpdatePulse, pulse }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [open, setOpen] = useState(false);

    const labelId = pulse[type]

    if (!labelId) return

    function getLabelById(type) {
        const label = board[type].find(label => label.id === labelId)
        return label
    }

    function onSelectLabel(labelId) {
        setOpen(false)
        const pulseToUpdate = {
            ...pulse, [type]: labelId
        }
        onUpdatePulse(pulseToUpdate)
    }

    const label = getLabelById(type)

    const trigger = (
        <div className="label-picker-container" style={{ backgroundColor: label.color }}>
            <span className="fold"></span>
            <span>
                {label ? label.title : 'Label not found'}
            </span>
        </div>
    )

    return (
        <Popover trigger={trigger} open={open} setOpen={setOpen}>
            <div className="label-picker-content">
                <ul className="label-picker-list">
                    {board[type].map(label => {
                        return <li onClick={() => onSelectLabel(label.id)}
                            key={label.id}
                            style={{ backgroundColor: label.color }}>
                            {label.title}
                        </li>
                    })}
                </ul>
            </div>
        </Popover>
    )
}
