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
            return { ...state, board: { ...state.board, groups: [...state.board.groups, action.group] } }
        // do we need here: (...state.board.groups || []) ?

        // GROUP
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
        // PULSE
        case ADD_PULSE:

        default:
            return state
    }
}


