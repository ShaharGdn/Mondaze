export const SET_BOARD = 'SET_BOARD'

export const ADD_GROUP = 'ADD_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const ADD_PULSE = 'ADD_PULSE'

const initialState = {
    board: null,
}

export function selectedBoardReducer(state = initialState, action) {
    switch (action.type) {
        // BOARD
        case SET_BOARD:
            return { ...state, board: action.board }
        case ADD_GROUP:
            // const { group, position } = action
            const groups = [...state.board.groups]
            if (action.position === 'start') {
                groups.unshift(action.group)
            } else {
                groups.push(action.group)
            }
            newState = { ...state, board: { ...state.board, groups } }
            break
        case REMOVE_GROUP:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.filter(group => group.id !== action.groupId)
                }
            }
        case UPDATE_GROUP:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group => group.id === action.group.id ? action.group : group)
                }
            }
            break
        case ADD_PULSE:
            const group = state.board.groups.find(group => group.id === action.groupId)
            const newGroup = {
                ...group, pulses: [...group.pulses, action.pulse]
            }
            newState = {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group => group.id === newGroup.id ? newGroup : group)
                }
            }
            break
        default:
    }
    return newState
}

// case ADD_GROUP:
//     return { ...state, board: { ...state.board, groups: [...state.board.groups, action.group] } }


// case ADD_PULSE:
//     const { groupId, pulse: newPulse } = action

//     const newGroups = state.board.groups.map(group => {
//         if (group.id === groupId) {
//             const updatedPulses = group.pulses.map(pulse =>
//                 pulse.id === newPulse.id ? newPulse : pulse
//             )
//             return { ...group, pulses: updatedPulses }
//         }
//         return group
//     })

//     newState = { ...state, board: { ...state.board, groups: newGroups } }
//     break