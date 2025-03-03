import { boardService } from "../../services/board/index.js"

export const SET_BOARDS = 'SET_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const UNDO_REMOVE_BOARD = 'UNDO_REMOVE_BOARD'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    boards: [],
    filterBy: boardService.getDefaultBoardsFilter(),
    lastBoards: []
}

export function boardReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_BOARDS:
            return { ...state, boards: action.boards, lastBoards: [...state.boards] }
        case REMOVE_BOARD:
            const lastBoards = [...state.boards]
            return {
                ...state,
                boards: state.boards.filter(board => board._id !== action.boardId),
                lastBoards
            }
        case ADD_BOARD:
            return { ...state, boards: [...state.boards, action.board], lastBoards: [...state.boards] }
        case UPDATE_BOARD:
            return {
                ...state,
                boards: state.boards.map(board => (board._id === action.board._id) ? action.board : board),
                lastBoards: [...state.boards]
            }
        case UNDO_REMOVE_BOARD:
            return { ...state, boards: [...state.lastBoards] }
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
        default:
            return state
    }
}