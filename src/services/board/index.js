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
        members: [
            {
                _id: 'u101',
                fullname: 'Michal Rotkop',
                imgUrl: '../src/assets/img/michal.jpg',
            },
            {
                _id: 'u102',
                fullname: 'Shahar Gadon',
                imgUrl: '../src/assets/img/shahar.jpg',
            },
            {
                _id: 'u103',
                fullname: 'Shush',
                imgUrl: '../src/assets/img/shush.jpg',
            },

        ],
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
                        'memberIds': ['u101'],
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
                        'memberIds': ['u101', 'u102'],
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
                        'memberIds': ['u101', 'u102', 'u103'],
                        'isDone': true

                    },
                    {
                        'id': makeId(),
                        'title': type + ' 4',
                        'status': 'stk4530',
                        'priority': 'low7891',
                        'dueDate': '2024-09-14',
                        'memberIds': ['u102'],
                        'isDone': ''

                    },
                ],
                style: { color: '#a25ddc' }
            },
        ],
        activities: [],
        cmpsOrder: ['MemberPicker', 'StatusPicker', 'PriorityPicker', 'DatePicker', 'DateRangePicker', 'NumberInput', 'TextInput'],
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

function createBoard(type, user) {
    let cmpsOrder = ['MemberPicker', 'StatusPicker', 'PriorityPicker', 'DatePicker', 'DateRangePicker', 'NumberInput', 'TextInput'];

    if (type === 'Leads') {
        cmpsOrder = ['StatusPicker', 'PriorityPicker', 'DatePicker', 'NumberInput'];
    } else if (type === 'Items') {
        cmpsOrder = ['StatusPicker', 'DatePicker', 'NumberInput'];
    }

    return {
        title: `My ${type} ${getRandomProjectEmoji(type)}`,
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
        members: [
            {
                _id: 'u101',
                fullname: 'Michal Rotkop',
                imgUrl: '../src/assets/img/michal.jpg',
            },
            {
                _id: 'u102',
                fullname: 'Shahar Gadon',
                imgUrl: '../src/assets/img/shahar.jpg',
            },
            {
                _id: 'u103',
                fullname: 'Shush',
                imgUrl: '../src/assets/img/shush.jpg',
            },
        ],
        groups: generateGroups(type),
        activities: [],
        cmpsOrder,
        type,
    }
}

function generateGroups(type) {
    if (type === 'Task') {
        return [
            {
                title: 'Backlog',
                id: makeId(),
                archivedAt: null,
                type: 'Backlog',
                pulses: [
                    {
                        'id': makeId(),
                        'title': 'Task 1',
                        'status': 'woi5432',
                        'priority': 'mdm1126',
                        'dueDate': '2024-09-24',
                        'dateRange': {
                            from: new Date('2024-09-24'),
                            to: new Date('2024-09-30')
                        },
                        'memberIds': ['u101'],
                        'isDone': false
                    },
                    {
                        'id': makeId(),
                        'title': 'Task 2',
                        'status': 'stk4530',
                        'priority': 'hgh3899',
                        'dueDate': '2024-10-10',
                        'memberIds': ['u101', 'u102'],
                        'isDone': ''
                    },
                ],
                style: { color: '#579bfc' }
            },
            {
                title: 'In Progress',
                id: makeId(),
                archivedAt: null,
                type: 'In Progress',
                pulses: [
                    {
                        'id': makeId(),
                        'title': 'Task 3',
                        'status': 'woi5432',
                        'priority': 'mdm1126',
                        'dueDate': '2024-09-15',
                        'memberIds': ['u103'],
                        'isDone': false
                    },
                ],
                style: { color: '#a25ddc' }
            },
        ];
    } else if (type === 'Leads') {
        return [
            {
                title: 'Active Clients',
                id: makeId(),
                archivedAt: null,
                type: 'Active',
                pulses: [
                    {
                        'id': makeId(),
                        'title': 'Client 1',
                        'status': 'woi5432',
                        'priority': 'mdm1126',
                        'dueDate': '2024-10-01',
                        'memberIds': ['u101'],
                        'isDone': false
                    },
                ],
                style: { color: '#579bfc' }
            },
            {
                title: 'Inactive Clients',
                id: makeId(),
                archivedAt: null,
                type: 'Inactive',
                pulses: [
                    {
                        'id': makeId(),
                        'title': 'Client 2',
                        'status': 'dnn8390',
                        'priority': 'low7891',
                        'dueDate': '2024-09-14',
                        'memberIds': ['u102'],
                        'isDone': true
                    },
                ],
                style: { color: '#a25ddc' }
            },
        ];
    } else if (type === 'Items') {
        return [
            {
                title: 'In Stock',
                id: makeId(),
                archivedAt: null,
                type: 'In Stock',
                pulses: [
                    {
                        'id': makeId(),
                        'title': 'Item 1',
                        'status': 'dnn8390',
                        'priority': 'hgh3899',
                        'dueDate': '2024-09-10',
                        'memberIds': [],
                        'isDone': false
                    },
                ],
                style: { color: '#579bfc' }
            },
            {
                title: 'Out of Stock',
                id: makeId(),
                archivedAt: null,
                type: 'Out of Stock',
                pulses: [
                    {
                        'id': makeId(),
                        'title': 'Item 2',
                        'status': 'stk4530',
                        'priority': 'low7891',
                        'dueDate': '2024-10-05',
                        'memberIds': [],
                        'isDone': true
                    },
                ],
                style: { color: '#a25ddc' }
            },
        ];
    }
}

function getRandomProjectEmoji(type) {
    const emojiCategories = {
        Task: ['🛠️', '📅', '✅', '🚧', '📝', '🔧', '💼'],
        Leads: ['💼', '📞', '📧', '💡', '💸', '📊'],
        Items: ['📦', '📉', '📈', '🛒', '🏷️', '🔄']
    };

    const emojis = emojiCategories[type] || ['🤷‍♂️'];
    const randomIndex = Math.floor(Math.random() * emojis.length);

    return emojis[randomIndex];
}

// Example Usage
// const taskBoard = createBoard('Task', user);
// const leadsBoard = createBoard('Leads', user);
// const itemsBoard = createBoard('Items', user);
// boardService.save(taskBoard)
// boardService.save(leadsBoard)
// boardService.save(itemsBoard)