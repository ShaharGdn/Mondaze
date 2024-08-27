const { DEV, VITE_LOCAL } = import.meta.env

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'
import { makeId } from '../util.service'
import { store } from '../../store/store'

const user = store.getState().userModule.user

function getEmptyBoard(type = 'Task') {
    return {
        title: 'New Board',
        isStarred: false,
        archivedAt: null,
        createdBy: user,
        style: {},
        labels: [],
        members: [],
        groups: [
            {
                title: 'Group Title',
                id: makeId(),
                archivedAt: null,
                type,
                pulses: [
                    {
                        'id': makeId(),
                        'title': type + ' 1'
                    },
                    {
                        'id': makeId(),
                        'title': type + ' 2'
                    },
                    {
                        'id': makeId(),
                        'title': type + ' 3'
                    },
                ],
                style: { color: 'blue' }
            },
            {
                title: 'Group Title',
                id: makeId(),
                archivedAt: null,
                type,
                pulses: [
                    {
                        'id': makeId(),
                        'title': type + ' 3'
                    },
                    {
                        'id': makeId(),
                        'title': type + ' 4'
                    },
                ],
                style: { color: 'purple' }
            },
        ],
        activities: [],
        // cmpsOrder: ['Person', 'Status', 'Date'],
        cmpsOrder: ['MemberPicker', 'StatusPicker', 'DatePicker'],
        type,
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

