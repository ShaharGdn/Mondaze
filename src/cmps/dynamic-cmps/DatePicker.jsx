import { useSelector } from "react-redux";
import React, { useState } from "react";

import { Popover } from "../popovers/Popover";
import { format } from 'date-fns';
import { compareAsc } from "date-fns";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { IoCheckmarkCircle } from "react-icons/io5";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { ICON_CLOSE_SQUARE, ICON_DATE } from "../icons/svg-icons";

export function DatePicker({ onUpdatePulse, pulse }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [open, setOpen] = useState(false)

    const dueDate = pulse.dueDate || ''


    function formatDate(date) {
        if (date === '') {
            return (
                <div className="empty-date hidden">
                    <BsFillPlusCircleFill />
                    <ICON_DATE />
                </div>
            )
        }
        const dateToShow = new Date(date)
        const formattedDate = {
            day: format(dateToShow, 'd'),
            month: (format(dateToShow, 'MMMM')).substring(0, 3),
            year: format(dateToShow, 'yyyy'),
        }

        return (
            <span className="date">
                <div className="progress-icon-container">{isOnTimeIcon(date)}</div>
                {`${formattedDate.day} ${formattedDate.month}`}
                <ICON_CLOSE_SQUARE className="close-btn hidden" onClick={onClearDate} />
            </span>
        )
    }

    function isOnTimeIcon(date) {
        const isOnTime = compareAsc(new Date(date), new Date())
        if (isOnTime === -1) {
            return <BsFillExclamationCircleFill className="over-due" size={17} />
        } else if (isOnTime === 1) {
            return <IoCheckmarkCircle className="on-time" size={20} />
        } else {
            <BsFillExclamationCircleFill className="today" size={17} />
        }
    }

    function onSelectDate(selectedDate) {
        setOpen(false)
        const formattedDate = format(selectedDate.$d, 'yyyy-MM-dd')
        const pulseToUpdate = {
            ...pulse, dueDate: formattedDate
        }
        onUpdatePulse(pulseToUpdate)
    }

    function onClearDate(event) {
        event.preventDefault()
        event.stopPropagation()
        const pulseToUpdate = {
            ...pulse, dueDate: ''
        }
        onUpdatePulse(pulseToUpdate)
    }

    const formattedDate = formatDate(dueDate)
    const trigger = (
        <div className={pulse.isDone ? "date-picker-container done" : "date-picker-container"}>
                {formattedDate}
        </div>
    )

    const defaultDate = dueDate && !isNaN(dayjs(dueDate)) ? dayjs(dueDate) : dayjs(new Date())

    return (
        <Popover trigger={trigger} open={open} setOpen={setOpen}>
            <div className="date-picker-content">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        autoFocus={true}
                        onChange={onSelectDate}
                        value={defaultDate}
                    />
                </LocalizationProvider>
            </div>
        </Popover>
    )
}