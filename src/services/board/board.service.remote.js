import { httpService } from '../http.service'

export const boardService = {
    query,
    getById,
    save,
    remove,
}

async function query(filterBy = { txt: '', person: ''}) { // needs modifying
    return httpService.get(`board`, filterBy)
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await httpService.put(`board/${board._id}`, board)
    } else {
        savedBoard = await httpService.post('board', board)
    }
    return savedBoard
}
