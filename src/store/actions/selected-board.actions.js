import { boardService } from '../../services/board'
import { store } from '../store'
import { ADD_GROUP, REMOVE_GROUP, SET_BOARD, UPDATE_GROUP, ADD_PULSE } from '../reducers/selected-board.reducer'


// Board
export async function loadBoard(boardId) {
    try {
        const board = await boardService.getBoardById(boardId)
        store.dispatch(getCmdSetBoard(board))
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    }
}


// Groups
export async function addGroup(boardId, position) {
    try {
        const addedGroup = await boardService.addGroup(boardId, position)
        store.dispatch(getCmdAddGroup(addedGroup, position))
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


// Pulses
export async function addPulse(boardId, groupId, pulse) {
    try {
        const addedPulse = await boardService.addPulse(boardId, groupId, pulse)
        store.dispatch(getCmdAddPulse(groupId, pulse))
        return addedPulse
    } catch (err) {
        console.log('Cannot add pulse', err)
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
function getCmdAddGroup(group, position) {
    return {
        type: ADD_GROUP,
        position,
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

function getCmdAddPulse(groupId, pulse) {
    return {
        type: ADD_PULSE,
        groupId,
        pulse
    }
}
// function getCmdRemovePulse(groupId) {
//     return {
//         type: REMOVE_GROUP,
//         groupId
//     }
// }
// function getCmdUpdatePulse(group) {
//     return {
//         type: UPDATE_GROUP,
//         group
//     }
// }