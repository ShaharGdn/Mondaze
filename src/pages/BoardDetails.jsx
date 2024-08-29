import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { addGroup, loadBoard } from '../store/actions/selected-board.actions'
import { GroupList } from '../cmps/group/GroupList'


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

      {board && <div className="main-display">
        <button className='add-group-btn' onClick={() => onAddGroup('start')}>
          <i className="fa-regular fa-plus fa-lg"></i>Add new group
        </button>
        <GroupList groups={board.groups} />
        <button className='add-group-btn' onClick={() => onAddGroup('end')}>
          <i className="fa-regular fa-plus fa-lg"></i>Add new group</button>
      </div>
      }

    </section>
  )
}