import { boardService } from '../../services/board'
import { store } from '../store'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, UPDATE_BOARD} from '../reducers/board.reducer'
import { loadBoard } from './selected-board.actions'
import { SOCKET_EVENT_ADD_BOARD, SOCKET_EVENT_REMOVE_BOARD, SOCKET_EVENT_UPDATE_BOARD } from '../../services/socket.service'

export async function loadBoards(filterBy) {
    try {
        const boards = await boardService.query(filterBy)
        store.dispatch(getCmdSetBoards(boards))
    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.removeBoard(boardId)
        store.dispatch(getCmdRemoveBoard(boardId))
        socketService.emit(SOCKET_EVENT_REMOVE_BOARD, boardId)
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdAddBoard(savedBoard))
        socketService.emit(SOCKET_EVENT_ADD_BOARD, savedBoard)
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdUpdateBoard(savedBoard))
        loadBoard(savedBoard._id)
        socketService.emit(SOCKET_EVENT_UPDATE_BOARD, savedBoard)
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

// Command Creators:
export function getCmdSetBoards(boards) {
    return {
        type: SET_BOARDS,
        boards
    }
}
export function getCmdRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}
export function getCmdAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}
export function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}