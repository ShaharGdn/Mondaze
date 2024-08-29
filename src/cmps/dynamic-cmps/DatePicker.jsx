import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Popover } from "../modals/Popover";
import { format } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';



import { IoCheckmarkCircle } from "react-icons/io5";
import { HiMiniExclamationCircle } from "react-icons/hi2";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { Paper } from "@mui/material";

{/* <MdOutlineDateRange /> */ }
{/* <IoCheckmarkCircle /> */ }
{/* <HiMiniExclamationCircle /> */ }
{/* <BsFillExclamationCircleFill /> */ }
{/* <BsCalendar2Date /> */ }


export function DatePicker({ onUpdatePulse, pulse }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [open, setOpen] = useState(false)

    const dueDate = new Date(pulse.dueDate)
    if (!dueDate) return

    function formatDate(date) {
        const formattedDate = {
            day: format(date, 'd'),
            month: (format(date, 'MMMM')).substring(0, 3),
            year: format(date, 'yyyy'),
        }
        return formattedDate
    }

    const formattedDate = formatDate(dueDate)

    function onSelectDate(selectedDate) {
        setOpen(false)
        const formattedDate = format(selectedDate.$d, 'yyyy-MM-dd')
        const pulseToUpdate = {
            ...pulse, dueDate: formattedDate
        }
        onUpdatePulse(pulseToUpdate)
    }

    const trigger = (
        <div className="date-picker-container">
            <span className="due-date">
                {`${formattedDate.day} ${formattedDate.month}`}
            </span>
        </div>
    )

    return (
        <Popover trigger={trigger} open={open} setOpen={setOpen}>
            <div className="date-picker-content">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar  
                    onChange={onSelectDate}
                    />
                </LocalizationProvider>
            </div>
        </Popover>
    )
}