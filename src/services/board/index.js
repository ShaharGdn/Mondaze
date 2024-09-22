const { DEV, VITE_LOCAL } = import.meta.env

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'
import { makeId } from '../util.service'
import { store } from '../../store/store'

const user = store.getState().userModule.user

function getEmptyBoard(type = 'Task') {
    const board = {
        title: 'New Board',
        isStarred: false,
        archivedAt: null,
        createdBy: user,
        folder: '',
        style: {},
        status: [
            {
                id: 'dft3488',
                title: 'Not Started',
                color: '#c4c4c4',
                type: 'Default',
            },
            {
                id: 'woi5432',
                title: 'Working on it',
                color: '#fdab3d',
                type: 'Default',
            },
            {
                id: 'stk4530',
                title: 'Stuck',
                color: '#df2f4a',
                type: 'Default',
            },
            {
                id: 'dnn8390',
                title: 'Done',
                color: '#00c875',
                type: 'Default',
            },
            // {
            //     id: 'dft3488',
            //     title: 'New',
            //     color: '#c4c4c4',
            //     type: 'Lead',
            // },
            // {
            //     id: 'inp9988',
            //     title: 'In progress',
            //     color: '#fdab3d',
            //     type: 'Lead',
            // },
            // {
            //     id: 'won1254',
            //     title: 'Won',
            //     color: '#00c875',
            //     type: 'Lead',
            // },
            // {
            //     id: 'lst7895',
            //     title: 'Lost',
            //     color: '#df2f4a',
            //     type: 'Lead',
            // },
        ],
        priority: [
            {
                id: 'dft3489',
                title: '',
                color: '#c4c4c4',
            },
            {
                id: 'crt5664',
                title: 'Critical',
                color: '#333333'
            },
            {
                id: 'hgh3899',
                title: 'High',
                color: '#401694'
            },
            {
                id: 'mdm1126',
                title: 'Medium',
                color: '#5559df'
            },
            {
                id: 'low7891',
                title: 'Low',
                color: '#579bfc'
            },
        ],
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
                        'title': type + ' 1',
                        'status': 'woi5432',
                        'priority': 'mdm1126',
                        'dueDate': '2024-09-24',
                        'dateRange': {
                            from: new Date('2024-09-24'),
                            to: new Date('2024-09-30')
                        },
                        // 'memberIds': ['u101'],
                        'memberIds': [],
                        'isDone': ''
                    },
                    {
                        'id': makeId(),
                        'title': type + ' 2',
                        'status': 'dnn8390',
                        'priority': 'mdm1126',
                        'dueDate': '2024-09-15',
                        'dateRange': {
                            from: new Date('2024-10-01'),
                            to: new Date('2024-11-14')
                        },
                        'memberIds': [],
                        // 'memberIds': ['u101', 'u102'],
                        'isDone': true

                    },
                    {
                        'id': makeId(),
                        'title': type + ' 3',
                        'status': 'stk4530',
                        'priority': 'hgh3899',
                        'dueDate': '2024-09-10',
                        'dateRange': {
                            from: new Date('2024-11-02'),
                            to: new Date('2024-12-01')
                        },
                        'memberIds': [],
                        'isDone': ''

                    },
                ],
                style: { color: '#579bfc' }
            },
            {
                title: 'Group Title',
                id: makeId(),
                archivedAt: null,
                type,
                pulses: [
                    {
                        'id': makeId(),
                        'title': type + ' 3',
                        'status': 'dnn8390',
                        'priority': 'hgh3899',
                        'dueDate': '2024-10-05',
                        // 'memberIds': ['u101', 'u102', 'u103'],
                        'memberIds': [],
                        'isDone': true

                    },
                    {
                        'id': makeId(),
                        'title': type + ' 4',
                        'status': 'stk4530',
                        'priority': 'low7891',
                        'dueDate': '2024-09-14',
                        // 'memberIds': ['u102'],
                        'memberIds': [],
                        'isDone': ''

                    },
                ],
                style: { color: '#a25ddc' }
            },
        ],
        activities: [],
        views: [],
        type,
    }

    let cmpsOrder = ['MemberPicker', 'StatusPicker', 'PriorityPicker', 'DatePicker', 'DateRangePicker', 'TextInput', 'NumberInput', 'FilesPicker'];
    if (type === 'Lead') {
        cmpsOrder = ['MemberPicker', 'StatusPicker', 'PriorityPicker', 'EmailInput', 'PhoneInput', 'NumberInput', 'TextInput', 'FilesPicker'];
    } else if (type === 'Item') {
        cmpsOrder = ['NumberInput', 'TextInput', 'PriorityPicker', 'FilesPicker'];
    }
    
    board.cmpsOrder = cmpsOrder
    return board
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

