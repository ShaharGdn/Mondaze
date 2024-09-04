import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { addGroup, loadBoard } from '../store/actions/selected-board.actions'

import { GroupList } from '../cmps/group/GroupList'
import { AddPulseBtn } from '../cmps/buttons/AddPulseBtn'
import { BoardHeader } from '../cmps/BoardHeader'

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
      {board &&<div className="main-display">

        <section className='main-top-container'>
          <div className='top-sticky-wrapper'>
            <BoardHeader board={board}/>
            <AddPulseBtn board={board} />
          </div>
       </section>

        <GroupList groups={board.groups} />
        <button className="add-group-btn" onClick={() => onAddGroup("end")}>
          <i className="fa-regular fa-plus fa-lg"></i>Add new group
        </button>
      </div>}
    </section>
  )
}
  

// return (
//   <section className="board-details main">
//     {board && <div className="main-display">
//       <section>
        
//       </section>

//       <BoardHeader board={board}/>
//       <AddPulseBtn board={board} />

//       <GroupList groups={board.groups} />
//       <button className="add-group-btn" onClick={() => onAddGroup("end")}>
//         <i className="fa-regular fa-plus fa-lg"></i>Add new group</button>
//     </div>
//     }

//   </section>
