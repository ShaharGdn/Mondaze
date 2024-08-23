import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { addGroup, loadBoard, removeGroup, updateGroup } from '../store/actions/selected-board.actions'
import { BoardFilter } from '../cmps/BoardFilter'
import { GroupList } from '../cmps/group/GroupList'
import { boardService } from '../services/board'


export function BoardDetails() {
  const { boardId } = useParams()
  const board = useSelector(storeState => storeState.selectedBoardModule.board)

  useEffect(() => {
    loadBoard(boardId)
  }, [boardId])

  async function onAddGroup(position = 'start') {
    try {
      await addGroup(boardId, position)
      showSuccessMsg(`Group added`)
    } catch (err) {
      showErrorMsg('Cannot add group')
    }
  }

  return (
    <section className="board-details main">
      <header className='board-header'></header>

      {board && <div>
        {/* <h1>{board.title}</h1> */}
        <button onClick={()=> onAddGroup('start')}>Add new group</button>
        <GroupList groups={board.groups}/>
        <button onClick={()=> onAddGroup('end')}>Add new group</button>
      </div>
      }

    </section>
  )
}