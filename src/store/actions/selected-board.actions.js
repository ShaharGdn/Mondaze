import { boardService } from '../../services/board'
import { store } from '../store'
import { ADD_GROUP, REMOVE_GROUP, SET_BOARD, UPDATE_GROUP, ADD_PULSE, REMOVE_PULSE, UPDATE_PULSE } from '../reducers/selected-board.reducer'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import { SOCKET_EVENT_ADD_GROUP, SOCKET_EVENT_ADD_PULSE, SOCKET_EVENT_REMOVE_GROUP, SOCKET_EVENT_REMOVE_PULSE, SOCKET_EVENT_UPDATE_GROUP, SOCKET_EVENT_UPDATE_PULSE, socketService } from '../../services/socket.service'

// Board
export async function loadBoard(boardId, filterBy = {}) {
    try {
        store.dispatch({ type: LOADING_START })
        const board = await boardService.getBoardById(boardId, filterBy)
        store.dispatch(getCmdSetBoard(board))
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

// Groups
export async function addGroup(boardId, position) {
    try {
        const addedGroup = await boardService.addGroup(boardId, position)
        store.dispatch(getCmdAddGroup(addedGroup, position))
        const data = { group: addedGroup, position }
        socketService.emit(SOCKET_EVENT_ADD_GROUP, data)
        return addedGroup
    } catch (err) {
        console.log('Cannot add group', err)
        throw err
    }
}

export async function duplicateGroup(group, boardId) {
    try {
        const addedGroup = await boardService.duplicateGroup(group, boardId)
        store.dispatch(getCmdAddGroup(addedGroup, 'end'))
        // const data = { group: addedGroup, position:'end' }
        // socketService.emit(SOCKET_EVENT_ADD_GROUP, data)
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
        socketService.emit(SOCKET_EVENT_REMOVE_GROUP, groupId)
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
        const data = { group: updatedGroup }
        socketService.emit(SOCKET_EVENT_UPDATE_GROUP, data)
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
        store.dispatch(getCmdAddPulse(groupId, addedPulse))
        const data = { groupId, pulse: addedPulse }
        socketService.emit(SOCKET_EVENT_ADD_PULSE, data)
        return addedPulse
    } catch (err) {
        console.log('Cannot add pulse', err)
        throw err
    }
}

export async function updatePulse(boardId, groupId, pulse) {
    try {
        const updatedPulse = await boardService.updatePulse(boardId, groupId, pulse)
        store.dispatch(getCmdUpdatePulse(groupId, updatedPulse))
        const data = { groupId, pulseToUpdate: updatedPulse }
        socketService.emit(SOCKET_EVENT_UPDATE_PULSE, data)
        return updatedPulse
    } catch (err) {
        console.log('Cannot update pulse', err)
        throw err
    }
}

export async function removePulse(boardId, groupId, pulseId) {
    try {
        const removedPulse = await boardService.removePulse(boardId, groupId, pulseId)
        store.dispatch(getCmdRemovePulse(groupId, pulseId))
        const data = { groupId, pulseId }
        socketService.emit(SOCKET_EVENT_REMOVE_PULSE, data)
        return removedPulse
    } catch (err) {
        console.log('Cannot remove pulse', err)
        throw err
    }
}

// Command Creators:
export function getCmdSetBoard(board) {
    return {
        type: SET_BOARD,
        board
    }
}
export function getCmdAddGroup(group, position) {
    return {
        type: ADD_GROUP,
        position,
        group
    }
}

export function getCmdRemoveGroup(groupId) {
    return {
        type: REMOVE_GROUP,
        groupId
    }
}

export function getCmdUpdateGroup(group) {
    return {
        type: UPDATE_GROUP,
        group
    }
}

export function getCmdAddPulse(groupId, pulse) {
    return {
        type: ADD_PULSE,
        groupId,
        pulse
    }
}

export function getCmdUpdatePulse(groupId, pulseToUpdate) {
    return {
        type: UPDATE_PULSE,
        groupId,
        pulseToUpdate
    }
}

export function getCmdRemovePulse(groupId, pulseId) {
    return {
        type: REMOVE_PULSE,
        groupId,
        pulseId
    }
}