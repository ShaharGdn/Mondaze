import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { addGroup, loadBoard, removeGroup } from '../store/actions/selected-board.actions'
import { BoardFilter } from '../cmps/BoardFilter'
import { GroupList } from '../cmps/group/GroupList'
import { boardService } from '../services/board'


export function BoardDetails() {

  const { boardId } = useParams()
  const board = useSelector(storeState => storeState.selectedBoardModule.board)

  useEffect(() => {
    loadBoard(boardId) // shouldn't be await?
  }, [boardId])

  async function onAddGroup() {
    try {
      await addGroup(boardId)
      showSuccessMsg(`Group added`)
    } catch (err) {
      showErrorMsg('Cannot add group')
    }
  }

  async function onRemoveGroup(groupId) {
    try {
      await removeGroup(boardId, groupId)
      showSuccessMsg(`Group removed (id: ${groupId})`)
    } catch (err) {
      showErrorMsg('Cannot remove group')
    }
  }

  return (
    <section className="board-details">
      <header className='board-header'></header>
      {/* <BoardFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}

      {board && <div>
        <h1>{board.title}</h1>
        <GroupList groups={board.groups} onRemoveGroup={onRemoveGroup} />
        <button onClick={onAddGroup}>Add new group</button>

        {/* <pre> {JSON.stringify(board, null, 2)} </pre> */}
      </div>
      }

    </section>
  )
}