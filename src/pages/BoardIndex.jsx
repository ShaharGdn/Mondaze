import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadBoards } from '../store/actions/board.actions'
import { BoardList } from '../cmps/BoardList'

export function BoardIndex() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    // const navigate = useNavigate()

    useEffect(() => {
        loadBoards()
    }, [])

    return (
        <main>
            <section className="board-index main">
                <header className='header-greeting'>
                    <div className="text-greeting">
                        <h5 className='Figtree-regular'>{`Good evening, ${loggedInUser.fullname}!`}</h5>
                        <h6 className='Figtree-semi-bold'>Quickly access your recent boards, Inbox and workspaces</h6>
                    </div>
                    <img src="../src/assets/img/header_background.svg" alt="header-bg-party" />
                </header>

                <main className="board-list-container main">
                    <BoardList
                        boards={boards} />
                </main>
            </section >
        </main>
    )
}