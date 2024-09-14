import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { addGroup, loadBoard, updatePulse } from '../store/actions/selected-board.actions'

import { GroupList } from '../cmps/group/GroupList'
import { BoardHeader } from '../cmps/BoardHeader'
import { BoardActionsBar } from '../cmps/BoardActionsBar'
import { SidePanel } from '../cmps/SidePanel'
import { GroupListKanban } from '../cmps/Kanban/GroupListKanban'

export function BoardDetails() {
  const { boardId } = useParams()
  const board = useSelector(storeState => storeState.selectedBoardModule.board)
  const [filterBy, setFilterBy] = useState()

  const [displayType, setDisplayType] = useState('main')
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const [selectedPulse, setSelectedPulse] = useState(null)

  useEffect(() => {
    loadBoard(boardId)
    setSelectedPulse(selectedPulse)

    return () => {
      setSelectedPulse(null)
    }
  }, [boardId, displayType, selectedPulse])

  async function onAddGroup(position = 'start') {
    try {
      await addGroup(boardId, position)
      showSuccessMsg(`Group added`)
    } catch (err) {
      showErrorMsg('Cannot add group')
    }
  }

  async function onUpdatePulse(groupId, pulseToUpdate) {
    try {
      const updatedPulse = await updatePulse(board._id, groupId, pulseToUpdate)
      setSelectedPulse({ pulse: updatedPulse, groupId })
      showSuccessMsg('Pulse updated successfully')
    } catch (err) {
      console.log('err:', err)
      showErrorMsg('Cannot update pulse')
    }
  }

  return (
    <>
      <main>
        <section className="board-details main">
          {board && <div className="main-display">

            <section className='main-top-container'>
              <div className='top-sticky-wrapper'>
                <BoardHeader board={board} />
                <BoardActionsBar board={board} setDisplayType={setDisplayType} displayType={displayType} filterBy={filterBy} setFilterBy={setFilterBy} />
              </div>
            </section>
            {/* <GroupList
              groups={displayType === 'kanban' ? groupPulsesByStatus()
                : board.groups} board={board} type={displayType} setSidePanelOpen={setSidePanelOpen} setSelectedPulse={setSelectedPulse} /> */}
            {displayType === 'kanban' ? <GroupListKanban groups={board.groups} board={board} setSidePanelOpen={setSidePanelOpen} setSelectedPulse={setSelectedPulse} />
              : <GroupList groups={board.groups} board={board} setSidePanelOpen={setSidePanelOpen} setSelectedPulse={setSelectedPulse} />}
            {displayType !== 'kanban' && <button className="add-group-btn" onClick={() => onAddGroup("end")}>
              <i className="fa-regular fa-plus fa-lg"></i>Add new group
            </button>}
          </div>}
        </section>
      </main>
      {selectedPulse && <SidePanel sidePanelOpen={sidePanelOpen} selectedPulse={selectedPulse} onUpdatePulse={onUpdatePulse} setSidePanelOpen={setSidePanelOpen} />}
    </>
  )
}