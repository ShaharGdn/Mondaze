export function StatsBar({ board, group, type }) {

    getColorMap()


    function getLabelColor(labelId) {
        const label = board[type].find(label => label.id === labelId)
        return label.color
    }

    function getStats() {

        group.pulses.map(pulse => console.log(pulse[type])
        )
    }
    function getColorMap() {
        // const colorMap = {}

        const colorMap = group.pulses.reduce((acc, pulse) => {
            const color = getLabelColor(pulse[type])
            console.log(color);


            acc[color] ? acc[color]++ : acc[color] = 1
            return acc
        }, {})

        // console.log(colorMap);
        
        // group.pulses.map(pulse => {
        //     const color = getLabelColor(pulse[type])
        //     colorMap[color] ? colorMap[color]++ : colorMap[color] = 1


        // })

    }

    // {
    //     red: 2,
    //     green:1,
    //     gray: 0
    // }






    return (
        <div>{type} bar</div>

    )
}