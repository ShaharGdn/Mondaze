import { boardService } from '../../services/board'
import { store } from '../store'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, UPDATE_BOARD, ADD_BOARD_MSG } from '../reducers/board.reducer'

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
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdAddBoard(savedBoard))
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
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

// Command Creators:
function getCmdSetBoards(boards) {
    return {
        type: SET_BOARDS,
        boards
    }
}
function getCmdRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}
function getCmdAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}
function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadBoards()
    await addBoard(boardService.getEmptyBoard())
    await updateBoard({
        _id: 'm1oC7',
        title: 'Board-Good',
    })
    await removeBoard('m1oC7')
    // TODO unit test addBoardMsg
}