export const SET_BOARD = 'SET_BOARD'

export const ADD_GROUP = 'ADD_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'

export const ADD_PULSE = 'ADD_PULSE'
export const UPDATE_PULSE = 'UPDATE_PULSE'
export const REMOVE_PULSE = 'REMOVE_PULSE'

const initialState = {
    board: null,
}

export function selectedBoardReducer(state = initialState, action) {
    switch (action.type) {
        // BOARD
        case SET_BOARD:
            return { ...state, board: action.board }
        // GROUP
        case ADD_GROUP:
            const groups = [...state.board.groups]
            if (action.position === 'start') {
                groups.unshift(action.group)
            } else {
                groups.push(action.group)
            }
            return { ...state, board: { ...state.board, groups } }
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
        case ADD_PULSE:
            var group = state.board.groups.find(group => group.id === action.groupId)
            var newGroup = {
                ...group, pulses: [...group.pulses, action.pulse]
            }
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group => group.id === newGroup.id ? newGroup : group)
                }
            }
        case UPDATE_PULSE:
            var group = state.board.groups.find(group => group.id === action.groupId)
            var newPulses = group.pulses.map(pulse => pulse.id === action.pulseToUpdate.id ? action.pulseToUpdate : pulse)
            var newGroup = {
                ...group, pulses: newPulses
            }
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group => group.id === newGroup.id ? newGroup : group)
                }
            }
        case REMOVE_PULSE:
            var group = state.board.groups.find(group => group.id === action.groupId)
            var newPulses = group.pulses.filter(pulse => pulse.id !== action.pulseId)
            var newGroup = {
                ...group, pulses: newPulses
            }
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group => group.id === newGroup.id ? newGroup : group)
                }
            }
        default: return state
    }
}
