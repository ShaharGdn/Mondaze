import { boardService } from '../../services/board'
import { store } from '../store'
import { ADD_GROUP, REMOVE_GROUP, SET_BOARD, UPDATE_GROUP } from '../reducers/selected-board.reducer'

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getBoardById(boardId)
        store.dispatch(getCmdSetBoard(board))
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    }
}

export async function addGroup(boardId) {
    try {
        const addedGroup = await boardService.addGroup(boardId)
        store.dispatch(getCmdAddGroup(addedGroup))
        return addedGroup
    } catch (err) {
        console.log('Cannot add group', err)
        throw err
    }
}

export async function removeGroup(boardId, groupId) {
    try {
        await boardService.removeGroup(boardId, groupId)
        store.dispatch(getCmdRemoveGroup(groupId))
        return groupId
    } catch (err) {
        console.log(`Cannot remove group (id: ${groupId}`, err)
        throw err
    }
}

export async function updateGroup(boardId, group) {
    try {
        const updatedGroup = await boardService.updateGroup(boardId, group)
        store.dispatch(getCmdUpdateGroup(updatedGroup))
        return updatedGroup
    } catch (err) {
        console.log(`Cannot update group (id: ${group.id}`, err)
        throw err
    }
}

// Command Creators:
function getCmdSetBoard(board) {
    return {
        type: SET_BOARD,
        board
    }
}
function getCmdAddGroup(group) {
    return {
        type: ADD_GROUP,
        group
    }
}
function getCmdRemoveGroup(groupId) {
    return {
        type: REMOVE_GROUP,
        groupId
    }
}
function getCmdUpdateGroup(group) {
    return {
        type: UPDATE_GROUP,
        group
    }
}