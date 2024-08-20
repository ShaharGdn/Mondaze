export const SET_BOARD = 'SET_BOARD'

const initialState = {
    board: null
}

export function selectedBoardReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_BOARD:
            newState = { ...state, board: action.board }
            break
        default:
    }
    return newState
}


