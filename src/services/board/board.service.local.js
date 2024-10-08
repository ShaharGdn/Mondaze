import { storageService } from '../async-storage.service'
import { makeId, getRandomColor } from '../util.service'
import { userService } from '../user'
import { updateBoard } from '../../store/actions/board.actions'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getBoardById,
    removeBoard,
    save,

    getGroupById,
    addGroup,
    duplicateGroup,
    updateGroup,
    removeGroup,

    getPulseById,
    addPulse,
    updatePulse,
    removePulse,
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

async function getBoardById(boardId, filterBy = {}) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    let filteredBoard = board

    if (filterBy && filterBy.txt) {
        // Filter the groups and pulses based on the filterBy.txt
        filteredBoard = {
            ...board,
            groups: board.groups.map(group => {
                const filteredPulses = group.pulses.filter(pulse => 
                    pulse.title.toLowerCase().includes(filterBy.txt.toLowerCase())
                )
                return {
                    ...group,
                    pulses: filteredPulses
                }
            }).filter(group => group.pulses.length > 0) // Only keep groups with matching pulses
        }
    }
    return filteredBoard
}


async function removeBoard(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    const boardToSave = {
        title: board.title,
        status: board.status,
        priority: board.priority,
        isStarred: board.isStarred,
        archivedAt: board.archivedAt,
        createdBy: board.createdBy,
        style: board.style,
        labels: board.labels,
        members: board.members,
        groups: board.groups,
        activities: board.activities,
        cmpsOrder: board.cmpsOrder,
        views: board.views || [],
        type: board.type
    }
    try {
        var savedBoard
        if (board._id) {
            boardToSave._id = board._id
            savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
        } else {
            savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
        }
        return savedBoard
    } catch (err) {
        console.log('Could not save board:', err)
        throw err
    }
}

// GROUP FUNCTIONS:

async function getGroupById(boardId, groupId) {
    try {
        const board = await getBoardById(boardId)
        return board.groups.find(group => group.id === groupId)
    } catch (err) {
        console.log('Could not get group:', err)
    }
}

async function addGroup(boardId, position = 'start') {
    try {
        const board = await getBoardById(boardId)
        const groupToAdd = {
            id: makeId(),
            boardId,
            title: 'New Group',
            archivedAt: null,
            pulses: [],
            style: { color: getRandomColor() },
            type: board.type,
        }

        if (position === 'start') {
            board.groups.unshift(groupToAdd)
        } else {
            board.groups.push(groupToAdd)
        }

        const updatedBoard = await updateBoard(board)
        await storageService.put(STORAGE_KEY, updatedBoard)

        return groupToAdd
    } catch (err) {
        console.log('Could not add group:', err)
    }
}

async function duplicateGroup(group, boardId) {
    try {
        const board = await getBoardById(boardId)
        const duplicatedGroup = { ...group, id: makeId() }

        board.groups.push(duplicatedGroup)

        const updatedBoard = await updateBoard(board)
        await storageService.put(STORAGE_KEY, updatedBoard)

        return duplicatedGroup
    } catch (err) {
        console.log('Could not duplicate group:', err)
    }
}

async function removeGroup(boardId, groupId) {
    try {
        const board = await getBoardById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        if (groupIdx < 0) throw new Error(`Removing group failed, cannot find group with id: ${groupId} in board ${boardId}`)

        board.groups.splice(groupIdx, 1)

        const updatedBoard = await updateBoard(board)
        await storageService.put(STORAGE_KEY, updatedBoard)

        return groupId
    } catch (err) {
        console.log('Could not remove group:', err)
    }
}

async function updateGroup(boardId, updatedGroup) {
    try {
        const board = await getBoardById(boardId)
        const updatedGroups = board.groups.map(group => group.id === updatedGroup.id ? updatedGroup : group)

        const newBoard = { ...board, groups: updatedGroups }
        const updatedBoard = await updateBoard(newBoard)
        await storageService.put(STORAGE_KEY, updatedBoard)

        return updatedGroup
    } catch (err) {
        console.log('Could not update group:', err)
        throw err
    }
}

// PULSE FUNCTIONS:

async function getPulseById(boardId, groupId, pulseId) {
    try {
        const group = await getGroupById(boardId, groupId)
        return group.pulses.find(pulse => pulse.id === pulseId)
    } catch (err) {
        console.log('Could not get pulse:', err)
    }
}

async function addPulse(boardId, groupId, pulse) {
    try {
        const board = await getBoardById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        if (groupIdx < 0) throw new Error(`Group with id ${groupId} not found in board ${boardId}`)

        const pulseToAdd = {
            id: makeId(),
            title: pulse.title || '',
            status: pulse.status || '',
            priority: pulse.priority || '',
            isDone: pulse.isDone || '',
            dueDate: pulse.dueDate || '',
            memberIds: pulse.memberIds || [],
        }

        board.groups[groupIdx].pulses.push(pulseToAdd)

        const updatedBoard = await updateBoard(board)
        await storageService.put(STORAGE_KEY, updatedBoard)

        return pulseToAdd
    } catch (err) {
        console.log('Could not add pulse:', err)
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

        const updatedBoard = await updateBoard(board)
        await storageService.put(STORAGE_KEY, updatedBoard)

        return pulseToUpdate
    } catch (err) {
        console.log('Could not update the pulse:', err)
        throw err
    }
}

async function removePulse(boardId, groupId, pulseId) {
    try {
        const board = await getBoardById(boardId)

        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        if (groupIdx < 0) throw new Error(`Group with id ${groupId} not found in board ${boardId}`)

        const pulseIdx = board.groups[groupIdx].pulses.findIndex(pulse => pulse.id === pulseId)
        if (pulseIdx < 0) throw new Error(`Update pulse failed, cannot find pulse with id: ${pulseId} in group ${groupId}`)

        board.groups[groupIdx].pulses.splice(pulseIdx, 1)

        const updatedBoard = await updateBoard(board)
        await storageService.put(STORAGE_KEY, updatedBoard)

    } catch (err) {
        console.log('Could not update the pulse:', err)
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