import { useSelector } from "react-redux";
import React, { useState } from "react";

import dayjs from 'dayjs';
import { Popover } from "../popovers/Popover";
import { format } from 'date-fns';
import { ICON_CLOSE_SQUARE } from "../icons/svg-icons";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";


export function DateRangePicker({ onUpdatePulse, pulse, group }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const [open, setOpen] = useState(false)

    const dateRange = pulse.dateRange || ''

    function formatDate(date) {
        if (date === '') {
            return (
                <div className="timeline-bar">
                    <span className="date-range-null"> - </span>
                    <span className="set-dates hidden">Set Dates</span>
                </div>
            )
        }
        const fromDate = date.from
        const toDate = date.to

        const formattedFromDate = {
            day: format(fromDate, 'd'),
            month: (format(fromDate, 'MMMM')).substring(0, 3),
            year: format(fromDate, 'yyyy'),
        }

        const formattedToDate = {
            day: format(toDate, 'd'),
            month: (format(toDate, 'MMMM')).substring(0, 3),
            year: format(toDate, 'yyyy'),
        }

        const daysDiff = dayjs(toDate).diff(dayjs(fromDate), 'days')

        function style() {
            const totalDays = dayjs(toDate).diff(dayjs(fromDate), 'days');
            const daysDiffFromStart = dayjs(new Date()).diff(dayjs(fromDate), 'days')
            const daysDiffFromEnd = dayjs(toDate).diff(dayjs(new Date()), 'days')
            const elapsed = (daysDiffFromStart / totalDays) * 100
            const remaining = (daysDiffFromEnd / totalDays) * 100

            if (elapsed <= 0) {
                return { background: '#333333' }
            } else {
                return {
                    background: `linear-gradient(to right, ${group.style.color} ${elapsed}%,#333333 ${elapsed}%, #333333 ${remaining}%)`
                }
            }
        }

        return (
            <span className="timeline-bar with-range" style={style()}>
                <span className="date-range">{`${formattedFromDate.day} ${formattedFromDate.month} - ${formattedToDate.day} ${formattedToDate.month}`}</span>
                <span className="days-diff hidden">{daysDiff + 'd'}</span>
                <ICON_CLOSE_SQUARE className="close-btn hidden" onClick={onClearDate} />
            </span>
        )
    }

    function onSelectDate(selectedDate) {
        if (selectedDate.from === selectedDate.to) return
        else {
            const formattedDate = {
                from: new Date(format(selectedDate.from, 'yyyy-MM-dd')),
                to: new Date(format(selectedDate.to, 'yyyy-MM-dd'))
            }
            setOpen(false)
            const pulseToUpdate = {
                ...pulse, dateRange: formattedDate
            }
            onUpdatePulse(pulseToUpdate)
        }
    }

    function onClearDate(event) {
        event.preventDefault()
        event.stopPropagation()
        const pulseToUpdate = {
            ...pulse, dateRange: ''
        }
        onUpdatePulse(pulseToUpdate)
    }

    const formattedDate = formatDate(dateRange)

    const trigger = (
        <div className={"date-range-container"}>
            {formattedDate}
        </div>
    )

    // const selected = {from: new Date, to: new Date}

    return (
        <Popover trigger={trigger} open={open} setOpen={setOpen}>
            <div className="date-range-content">
                <DayPicker
                    mode="range"
                    onSelect={onSelectDate}
                // selected={selected}
                // selected={dateRange}
                />
            </div>
        </Popover>
    )
}