import { useSelector } from "react-redux"

export function LabelPicker({ type, onUpdatePulse, pulse }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const labelId = pulse[type]

    function getLabelById(type) {
        const label = board[type].find(label => label.id === labelId)
        return label
    }

    const label = getLabelById(type)

    return (
        <div style={{backgroundColor: label.color, width: 100 + '%', height: 100 + '%', textAlign: 'center', color: 'white', alignContent: 'center'}}>{label ? label.title : 'Label not found'}</div>
    )
}