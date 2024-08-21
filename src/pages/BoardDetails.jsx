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
    loadBoard(boardId) // shouldn't be await?
  }, [boardId])

  async function onAddGroup(position = 'start') {
    try {
      await addGroup(boardId, position)
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

  async function onUpdateGroup(group) {
    try {
      const updatedGroup = await updateGroup(boardId, group)
      showSuccessMsg(`Group updated (id: ${updatedGroup.id})`)
    } catch (err) {
      showErrorMsg('Cannot update group')
    }
  }

  return (
    <section className="board-details">
      <header className='board-header'></header>
      {/* <BoardFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}

      {board && <div>
        <h1>{board.title}</h1>
        <button onClick={()=> onAddGroup('start')}>Add new group</button>
        <GroupList groups={board.groups} onUpdateGroup={onUpdateGroup} onRemoveGroup={onRemoveGroup} />
        <button onClick={()=> onAddGroup('end')}>Add new group</button>
      </div>
      }

    </section>
  )
}