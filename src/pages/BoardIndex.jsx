import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/actions/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { boardService } from '../services/board'
import { userService } from '../services/user'

import { BoardList } from '../cmps/BoardList'
import { BoardFilter } from '../cmps/BoardFilter'
import { useNavigate } from 'react-router'

export function BoardIndex() {
    const [ filterBy, setFilterBy ] = useState(boardService.getDefaultFilter())
    const boards = useSelector(storeState => storeState.boardModule.boards)

    const navigate = useNavigate()

    console.log('boards:', boards)
    useEffect(() => {
        loadBoards(filterBy)
    }, [filterBy])

    // async function onUpdateBoard(board) {
    //     const speed = +prompt('New speed?', board.speed)
    //     if(speed === 0 || speed === board.speed) return

    //     const boardToSave = { ...board, speed }
    //     try {
    //         const savedBoard = await updateBoard(boardToSave)
    //         showSuccessMsg(`Board updated, new speed: ${savedBoard.speed}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update board')
    //     }        
    // }

    return (
        <section className="board-index main">
            <header className='header-greeting'>
                <div className="text-greeting">
                    <h5 className='Figtree-regular'>Good evening `{ }`, Shahar! `{ }`</h5>
                    <h6 className='Figtree-semi-bold'>Quickly access your recent boards, Inbox and workspaces</h6>
                </div>
                <img src="src/assets/img/header_background.svg" alt="header-bg-party" />
            </header>

            <main className="board-list-container main">
            <BoardList
                boards={boards}/>
            </main>
        </section >
    )
}