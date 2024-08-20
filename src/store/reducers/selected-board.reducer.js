export const SET_BOARD = 'SET_BOARD'
export const ADD_GROUP = 'ADD_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'

const initialState = {
    board: null,
}

export function selectedBoardReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_BOARD:
            newState = { ...state, board: action.board }
            break
        case ADD_GROUP:
            newState = { ...state, board: { ...state.board, groups: [...state.board.groups, action.group] } }
            // do we need here: (...state.board.groups || []) ?
            break
        case REMOVE_GROUP:
            newState = {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.filter(group => group.id !== action.groupId)
                }
            }
            break
        default:
    }
    return newState
}


