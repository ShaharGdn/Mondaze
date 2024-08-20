import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getBoardById,
    removeBoard,
    save,
    getGroupById,
    addGroup,
    updateGroup,
    removeGroup,

    getPulseById,
    addPulse,
    updatePulse
}
window.cs = boardService

// BOARD FUNCTIONS:

async function query(filterBy = { txt: '', person: 0 }) { // needs modifying
    var boards = await storageService.query(STORAGE_KEY)
    // const { txt, person, sortField, sortDir } = filterBy

    // if (txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
    // }
    // // if (person) {
    // //     boards = boards.filter(board => board.speed >= minSpeed)
    // // }
    // if(sortField === 'txt'){
    //     boards.sort((board1, board2) => 
    //         board1[sortField].localeCompare(board2[sortField]) * +sortDir)
    // }
    // if(sortField === 'price' || sortField === 'speed'){
    //     boards.sort((board1, board2) => 
    //         (board1[sortField] - board2[sortField]) * +sortDir)
    // }

    // boards = boards.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))

    return boards
}

function getBoardById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function removeBoard(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

// title: '',
// isStarred: false,
// archivedAt: null,
// createdBy: {},
// style: {},
// labels: [],
// members: [],
// groups: [],
// activities: [],
// cmpsOrder: [],

async function save(board) {
    try {

        var savedBoard
        if (board._id) {
            const boardToSave = {
                _id: board._id,
                title: board.title,
                isStarred: board.isStarred,
                archivedAt: board.archivedAt,
                createdBy: board.createdBy,
                style: board.style,
                labels: board.labels,
                members: board.members,
                groups: board.groups,
                activities: board.activities,
                cmpsOrder: board.cmpsOrder,
            }
            savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
        } else {
            const boardToSave = {
                title: board.title,
                isStarred: board.isStarred,
                archivedAt: board.archivedAt,
                createdBy: board.createdBy,
                style: board.style,
                labels: board.labels,
                members: board.members,
                groups: board.members,
                activities: board.activities,
                cmpsOrder: board.cmpsOrder,
            }
            savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
        }
        return savedBoard
    } catch (err) {
        console.log('err couldnt save board:', err)
        throw err
    }
}

// GROUP FUNCTIONS:

async function getGroupById(boardId, groupId) {
    try {

        const board = await getBoardById(boardId)
        const group = board.groups.filter(group => group.id === groupId)

        return group[0]
    } catch (err) {
        console.log('err couldnt get group:', err)
    }
}

async function addGroup(boardId) {
    try {
        const board = await getBoardById(boardId)
        const groupToAdd = {
            id: makeId(),
            title: 'Group ' + (board.groups.length + 1),
            archivedAt: null,
            pulses: [],
            style: {}
        }

        board.groups.push(groupToAdd)
        await storageService.put(STORAGE_KEY, board)

        return groupToAdd
        // return storageService.put(STORAGE_KEY, board)
    } catch (err) {
        console.log('err couldnt add group:', err)
    }
}

async function removeGroup(boardId, groupId) {
    try {
        const board = await getBoardById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        if (groupIdx < 0) throw new Error(`Removing group failed, cannot find group with id: ${groupId} in board ${boardId}`)

        board.groups.splice(groupIdx, 1)
        await storageService.put(STORAGE_KEY, board)

        return groupId
    } catch (err) {
        console.log('err couldnt remove group:', err)
    }
}

async function updateGroup(boardId, groupToUpdate) {
    try {
        const board = await getBoardById(boardId)
        const updatedGroups = board.groups.map(group => group.id === groupToUpdate.id ? groupToUpdate : group)

        const updatedBoard = { ...board, groups: updatedGroups }
        await storageService.put(STORAGE_KEY, updatedBoard)

        return groupToUpdate
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

// another option:
// async function updateGroup(boardId, groupToUpdate) {
//     try {
//         const board = await getBoardById(boardId)
//         const idx = board.groups.findIndex(group => group.id === groupToUpdate.id)

//         if (idx < 0) throw new Error(`update Group failed, cannot find group with id: ${groupToUpdate.id} in: ${boardId}`)
//         board.groups.splice(idx, 1, groupToUpdate)

//         await storageService.put(STORAGE_KEY, board)

//         return groupToUpdate
//     } catch (err) {
//         console.log('err:', err)
//         throw err
//     }
// }


// ITEM/PULSE/TASK FUNCTIONS:

async function getPulseById(boardId, groupId, pulseId) {
    try {
        const group = await getGroupById(boardId, groupId)
        const pulse = group.pulses.filter(pulse => pulse.id === pulseId)

        return pulse[0]

    } catch (err) {
        console.log('err couldnt get pulse:', err)
    }
}

async function addPulse(boardId, groupId, pulse) {
    try {
        const board = await getBoardById(boardId)
        const group = await getGroupById(boardId, groupId)

        const pulseToAdd = {
            id: makeId(),
            title: 'Replace Name',
        }

        group.pulses.push(pulseToAdd)
        updateGroup(boardId, group)
        return pulseToAdd

    } catch (err) {
        console.log('err couldnt add the pulse:', err)
        throw err
    }
}

async function updatePulse(boardId, groupId, pulseToUpdate) {
    try {
        const board = await getBoardById(boardId)

        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        if (groupIdx < 0) throw new Error(`Group with id ${groupId} not found in board ${boardId}`)

        const pulseIdx = board.groups[groupIdx].pulses.findIndex(pulse => pulse.id === pulseToUpdate.id)
        if (pulseIdx < 0) throw new Error(`Update pulse failed, cannot find pulse with id: ${pulseToUpdate.id} in group ${groupId}`)

        board.groups[groupIdx].pulses[pulseIdx] = pulseToUpdate

        await storageService.put(STORAGE_KEY, board)

        return pulseToUpdate
    } catch (err) {
        console.log('err couldnt update the pulse:', err)
        throw err
    }
}

//TESTING:

// ADD BOARD:
// save(
//     {
//         id: makeId(),
//         title: '',
//         isStarred: false,
//         archivedAt: null,
//         createdBy: {},
//         style: {},
//         labels: [],
//         members: [],
//         groups: [],
//         activities: [],
//         cmpsOrder: [],
//     }
// )

// ADD GROUP:
// addGroup('ZwMxA', {
//     title: '',
//     archivedAt: null,
//     pulses: [],
//     style: {}
// })

// UPDATE GROUP:

// updateGroup('H2BgC', {
//     id: '1wbrlx',
//     title: 'Group test',
//     archivedAt: new Date(),
//     pulses: [],
//     style: {}
// })

// const group = getGroupById('EwR5zj', 'H2BgC')
// console.log('group:', group)



// updatePulse('H2BgC', 'B81huh', {
//     "id": "6lKK02",
//     "title": "Replace shmoli"
// })

