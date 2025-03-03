import { boardService } from '../../services/board'
import { store } from '../store'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, SET_FILTER_BY, UNDO_REMOVE_BOARD, UPDATE_BOARD } from '../reducers/board.reducer'
import { loadBoard } from './selected-board.actions'
import { SOCKET_EVENT_ADD_BOARD, SOCKET_EVENT_REMOVE_BOARD, SOCKET_EVENT_UPDATE_BOARD } from '../../services/socket.service'

export async function loadBoards() {
    store.dispatch({ type: LOADING_START })
    try {
        const { filterBy } = store.getState().boardModule
        const boards = await boardService.query(filterBy)
        store.dispatch(getCmdSetBoards(boards))
    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    } finally {
        store.dispatch({ type: LOADING_DONE })
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

export async function removeBoardOptimistic(boardId) {
    store.dispatch(getCmdRemoveBoard(boardId))
    try {
        await boardService.removeBoard(boardId)
        socketService.emit(SOCKET_EVENT_REMOVE_BOARD, boardId)
    } catch (err) {
        store.dispatch(getCmdUndoRemoveBoard())
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

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
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
export function getCmdUndoRemoveBoard() {
    return { type: UNDO_REMOVE_BOARD }
}