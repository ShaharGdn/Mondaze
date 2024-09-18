export function StatsBar({ board, group, labelType }) {

    function getLabelColor(labelId) {
        const label = board[labelType].find(label => label.id === labelId)
        return label.color
    }

    function getColorMap() {
        return group.pulses.reduce((acc, pulse) => {
            const color = getLabelColor(pulse[labelType])
            acc[color] ? acc[color]++ : acc[color] = 1
            return acc
        }, {})
    }

    function getColorData() {
        const colorMap = getColorMap()
        const total = group.pulses.length
        const colorData = Object.entries(colorMap).map(([labelColor, labelCount]) => {
            return {
                color: labelColor,
                count: labelCount,
                ratio: total === 0 ? 0 : (labelCount / total) * 100
            }
        })
        return colorData
    }

    return (
        <section className="stats-bar">
            <div className="empty-stats"></div>
            {getColorData().map((data, idx) => {
                return <div
                    key={idx}
                    className="stats-clr"
                    style={{ backgroundColor: data.color, width: `${data.ratio}%` }}
                ></div>
            })}
        </section>
    )
}