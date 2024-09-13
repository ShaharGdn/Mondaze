import { httpService } from '../http.service'

export const boardService = {
    // BOARDS
    query,

    // BOARD
    getBoardById,
    save,
    removeBoard,

    // GROUP
    getGroupById,
    addGroup,
    duplicateGroup,
    updateGroup,
    removeGroup,

    // PULSE
    getPulseById,
    addPulse,
    updatePulse,
    removePulse,
}

// BOARDS
async function query(filterBy = { txt: '' }) {
    return httpService.get(`board/`, filterBy)
}

// BOARD
function getBoardById(boardId) {
    return httpService.get(`board/${boardId}`)
}

async function removeBoard(boardId) {
    return httpService.delete(`board/${boardId}`)
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await httpService.put(`board/${board._id}`, board)
    } else {
        savedBoard = await httpService.post('board/', board)
    }
    return savedBoard
}

// GROUP
function getGroupById(boardId, groupId) {
    return httpService.get(`board/group/${boardId}/${groupId}`)
}

function addGroup(boardId, position) {
    return httpService.post(`board/group/${boardId}`, position)
}

function duplicateGroup(boardId, group) {
    return httpService.post(`board/group/${boardId}/duplicate/`, group)
}

function updateGroup(boardId, group) {
    return httpService.put(`board/group/${boardId}`, group)
}

function removeGroup(boardId, groupId) {
    return httpService.delete(`board/group/${boardId}/${groupId}`)
}

// PULSE
function getPulseById(boardId, groupId, pulseId) {
    return httpService.get(`board/pulse/${boardId}/${groupId}/${pulseId}`)
}

function addPulse(boardId, groupId, pulse) {
    return httpService.post(`board/pulse/${boardId}/${groupId}`, pulse)
}

function updatePulse(boardId, groupId, pulse) {
    return httpService.put(`board/pulse/${boardId}/${groupId}`, pulse)
}

function removePulse(boardId, groupId, pulseId) {
    return httpService.delete(`board/pulse/${boardId}/${groupId}/${pulseId}`)
}

// async function savePulse(boardId, groupId, pulse) {
//     var savedPulse
//     if (pulse.id) {
//         savedPulse = await httpService.put(`board/pulse/${boardId}/${groupId}`, pulse)
//     } else {
//         savedPulse = await httpService.post(`board/pulse/${boardId}/${groupId}`, pulse)
//     }
//     return savedPulse
// }

