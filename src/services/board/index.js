const { DEV, VITE_LOCAL } = import.meta.env

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'
import { store } from '../../store/store'

const user = store.getState().userModule.user

function getEmptyBoard() {
    return {
        title: 'New Board',
        isStarred: false,
        archivedAt: null,
        createdBy: user,
        style: {},
        labels: [],
        members: [],
        groups: [],
        activities: [],
        cmpsOrder: [],
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        person: '',
        status: '',
        priority: '',
    }
}


const service = VITE_LOCAL === 'true' ? local : remote
export const boardService = { getEmptyBoard, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.boardService = boardService

// boardService.save(getEmptyBoard())

