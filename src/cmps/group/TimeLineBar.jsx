import { format } from 'date-fns';
import { compareAsc } from "date-fns";
import dayjs from 'dayjs';


export function TimeLineBar({ board, group }) {
    const earliestDate = group.pulses.reduce((date, pulse) => {
        return compareAsc(new Date(pulse.dateRange?.from), new Date(date)) < 0 ? format(pulse.dateRange.from, 'yyyy-MM-dd') : format(date, 'yyyy-MM-dd')
    }, '2070-01-01')

    const latestDate = group.pulses.reduce((date, pulse) => {
        return compareAsc(new Date(pulse.dateRange?.to), new Date(date)) > 0 ? format(pulse.dateRange.to, 'yyyy-MM-dd') : format(date, 'yyyy-MM-dd')
    }, '1970-01-01')

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

        return (
            <span className="timeline-bar with-range" style={style()}>
                <span className="date-range">{`${formattedFromDate.day} ${formattedFromDate.month} - ${formattedToDate.day} ${formattedToDate.month}`}</span>
                <span className="days-diff hidden">{daysDiff + 'd'}</span>
            </span>
        )
    }

    const formattedDate = formatDate(formattedDates)

    return <div className="timeline-sum-container">
        <div className={"date-range-container"}>
            {formattedDate}
        </div>
    </div>
}