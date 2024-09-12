import { format } from 'date-fns';
import { compareAsc } from "date-fns";
import dayjs from 'dayjs';


export function DueDateBar({ group }) {
    const latestDate = group.pulses.reduce((date, pulse) => {
        return compareAsc(new Date(pulse.dueDate), new Date(date)) > 0 ? pulse.dueDate : format(date, 'yyyy-MM-dd')
    }, '1970-01-01')

    const earliestDate = group.pulses.reduce((date, pulse) => {
        return compareAsc(new Date(pulse.dueDate), new Date(date)) < 0 ? pulse.dueDate : format(date, 'yyyy-MM-dd')
    }, '2070-01-01')

    const formattedDates = {
        from: earliestDate === '2070-01-01' ? null : earliestDate,
        to: latestDate === '1970-01-01' ? null : latestDate
    }

    if (formattedDates.from === null || formattedDates.to === null) {
        return (
            <div className="timeline-bar">
                <span className="date-range-empty"> - </span>
            </div>
        )
    }

    function formatDate(date) {
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

        if (fromDate === toDate) {
            return (
                <div className="due-date-bar with-range" style={{ background: group.style.color }}>
                    <span className="date">{`${formattedFromDate.day} ${formattedFromDate.month}`}</span>
                    <span className="days-diff hidden">{(daysDiff === 0 ? 1 : daysDiff) + 'd'}</span>
                </div>
            )
        }

        return (
            <span className="due-date-bar with-range" style={style()}>
                <span className="date-range">{`${formattedFromDate.day} ${formattedFromDate.month} - ${formattedToDate.day} ${formattedToDate.month}`}</span>
                <span className="days-diff hidden">{daysDiff + 'd'}</span>
            </span>
        )
    }

    const formattedDate = formatDate(formattedDates)

    return <div className="due-date-sum-container">
        <div className={"date-range-container"}>
            {formattedDate}
        </div>
    </div>
}